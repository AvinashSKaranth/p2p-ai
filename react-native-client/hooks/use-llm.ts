import { useCallback, useRef, useState } from "react";
import {
    checkMultimodalSupport,
    createLLM,
    GEMMA_4_E2B_IT,
    type LiteRTLMInstance,
} from "react-native-litert-lm";

export type LLMStatus = "idle" | "downloading" | "loading" | "ready" | "error";

const MODEL_FILE_NAME = "gemma-4-E2B-it.litertlm";

/** Errors that indicate the GPU backend isn't available on this device */
function isGpuUnsupportedError(msg: string): boolean {
  const patterns = [
    "OPENCL",
    "opencl",
    "GPU delegate",
    "gpu delegate",
    "GpuDelegate",
    "Metal",
    "backend not available",
    "backend is not supported",
  ];
  return patterns.some((p) => msg.includes(p));
}

const MODEL_CONFIG_BASE = {
  systemPrompt: "You are a helpful assistant.",
  temperature: 0.7,
  topK: 40,
  topP: 0.95,
  maxTokens: 1024,
} as const;

export function useLLM() {
  const [status, setStatus] = useState<LLMStatus>("idle");
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [activeBackend, setActiveBackend] = useState<"cpu" | "gpu" | null>(
    null,
  );
  const llmRef = useRef<LiteRTLMInstance | null>(null);
  const stopRequestedRef = useRef(false);

  const ensureLLM = useCallback(() => {
    if (!llmRef.current) {
      llmRef.current = createLLM();
    }
    return llmRef.current;
  }, []);

  const freshLLM = useCallback(() => {
    try {
      llmRef.current?.close();
    } catch {}
    llmRef.current = null;
    return ensureLLM();
  }, [ensureLLM]);

  /** Delete the cached model file */
  const deleteModel = useCallback(async () => {
    try {
      const inst = ensureLLM();
      try {
        inst.close();
      } catch {}
      await inst.deleteModel(MODEL_FILE_NAME);
      llmRef.current = null;
      setStatus("idle");
      setError(null);
      setDownloadProgress(0);
      setActiveBackend(null);
    } catch (e: any) {
      console.warn("deleteModel:", e?.message);
    }
  }, [ensureLLM]);

  /** Download model only (no load) */
  const downloadModel = useCallback(async () => {
    try {
      setError(null);
      setStatus("downloading");
      setDownloadProgress(0);

      const inst = ensureLLM();
      const localPath = await inst.downloadModel(
        GEMMA_4_E2B_IT,
        MODEL_FILE_NAME,
        (progress: number) => setDownloadProgress(progress),
      );

      setStatus("idle");
      return localPath;
    } catch (e: any) {
      setError(e?.message ?? "Download failed");
      setStatus("error");
      return null;
    }
  }, [ensureLLM]);

  /**
   * Load model into memory. Auto-downloads if needed.
   * If GPU fails (no OpenCL), automatically falls back to CPU.
   * If load fails for other reasons, deletes the file and retries once.
   */
  const loadModel = useCallback(
    async (backend: "cpu" | "gpu" = "cpu") => {
      const doLoad = async (inst: LiteRTLMInstance, b: "cpu" | "gpu") => {
        await inst.loadModel(
          GEMMA_4_E2B_IT,
          { ...MODEL_CONFIG_BASE, backend: b },
          (progress: number) => {
            if (progress < 1) setStatus("downloading");
            setDownloadProgress(progress);
          },
        );
      };

      setError(null);
      setStatus("loading");

      try {
        const inst = ensureLLM();
        await doLoad(inst, backend);
        setActiveBackend(backend);
        setStatus("ready");
        return;
      } catch (e: any) {
        const msg = e?.message ?? "";

        // GPU not available → fall back to CPU
        if (backend === "gpu" && isGpuUnsupportedError(msg)) {
          console.warn("GPU not available, falling back to CPU:", msg);
          setError("GPU not available on this device. Using CPU...");

          try {
            const inst = freshLLM();
            setStatus("loading");
            await doLoad(inst, "cpu");
            setActiveBackend("cpu");
            setError(null);
            setStatus("ready");
            return;
          } catch (cpuErr: any) {
            // CPU also failed — fall through to re-download logic below
            console.warn("CPU fallback also failed:", cpuErr?.message);
          }
        }

        // Non-GPU error or CPU fallback also failed → likely corrupt model, delete and retry
        console.warn("Model load failed, deleting and retrying:", msg);
        setError("Model may be corrupt. Re-downloading...");
        setStatus("downloading");
        setDownloadProgress(0);

        try {
          const inst = freshLLM();
          try {
            await inst.deleteModel(MODEL_FILE_NAME);
          } catch {}

          await inst.downloadModel(
            GEMMA_4_E2B_IT,
            MODEL_FILE_NAME,
            (progress: number) => setDownloadProgress(progress),
          );

          setStatus("loading");
          // Always use CPU for the retry to avoid the same GPU error
          await doLoad(inst, "cpu");
          setActiveBackend("cpu");
          setError(null);
          setStatus("ready");
        } catch (retryErr: any) {
          setError(
            retryErr?.message ?? "Failed to load model after re-download",
          );
          setStatus("error");
        }
      }
    },
    [ensureLLM, freshLLM],
  );

  /** Delete model, re-download, and load */
  const redownloadAndLoad = useCallback(
    async (backend: "cpu" | "gpu" = "cpu") => {
      try {
        setError(null);
        setStatus("downloading");
        setDownloadProgress(0);

        const inst = freshLLM();
        try {
          await inst.deleteModel(MODEL_FILE_NAME);
        } catch {}

        await inst.downloadModel(
          GEMMA_4_E2B_IT,
          MODEL_FILE_NAME,
          (progress: number) => setDownloadProgress(progress),
        );

        setStatus("loading");

        try {
          await inst.loadModel(GEMMA_4_E2B_IT, {
            ...MODEL_CONFIG_BASE,
            backend,
          });
          setActiveBackend(backend);
          setStatus("ready");
        } catch (loadErr: any) {
          // GPU fallback
          if (
            backend === "gpu" &&
            isGpuUnsupportedError(loadErr?.message ?? "")
          ) {
            console.warn(
              "GPU not available after re-download, falling back to CPU",
            );
            const cpuInst = freshLLM();
            await cpuInst.loadModel(GEMMA_4_E2B_IT, {
              ...MODEL_CONFIG_BASE,
              backend: "cpu",
            });
            setActiveBackend("cpu");
            setStatus("ready");
            setError(null);
          } else {
            throw loadErr;
          }
        }
      } catch (e: any) {
        setError(e?.message ?? "Re-download failed");
        setStatus("error");
      }
    },
    [freshLLM],
  );

  const sendMessage = useCallback(async (text: string): Promise<string> => {
    if (!llmRef.current) throw new Error("Model not loaded");
    return llmRef.current.sendMessage(text);
  }, []);

  const sendMessageStreaming = useCallback(
    (text: string, onToken: (token: string, done: boolean) => void) => {
      if (!llmRef.current) throw new Error("Model not loaded");
      llmRef.current.sendMessageAsync(text, onToken);
    },
    [],
  );

  const sendMessageWithImage = useCallback(
    async (text: string, imagePath: string): Promise<string> => {
      if (!llmRef.current) throw new Error("Model not loaded");
      return llmRef.current.sendMessageWithImage(text, imagePath);
    },
    [],
  );

  const sendMessageWithAudio = useCallback(
    async (text: string, audioPath: string): Promise<string> => {
      if (!llmRef.current) throw new Error("Model not loaded");
      return llmRef.current.sendMessageWithAudio(text, audioPath);
    },
    [],
  );

  const resetConversation = useCallback(() => {
    llmRef.current?.resetConversation();
  }, []);

  /** Request the current streaming generation to stop */
  const stopGeneration = useCallback(() => {
    stopRequestedRef.current = true;
  }, []);

  const close = useCallback(() => {
    try {
      llmRef.current?.close();
    } catch {}
    llmRef.current = null;
    setStatus("idle");
    setError(null);
    setActiveBackend(null);
  }, []);

  const isMultimodalSupported = checkMultimodalSupport() === undefined;

  return {
    status,
    downloadProgress,
    error,
    activeBackend,
    downloadModel,
    loadModel,
    deleteModel,
    redownloadAndLoad,
    sendMessage,
    sendMessageStreaming,
    sendMessageWithImage,
    sendMessageWithAudio,
    resetConversation,
    stopGeneration,
    stopRequestedRef,
    close,
    isMultimodalSupported,
  };
}
