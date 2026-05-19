export function el(id) { return document.getElementById(id); }

export function addMessage(text, sender = 'assistant', meta = '') {
  const container = el('chat-messages');
  const msg = document.createElement('div');
  msg.className = `message ${sender}`;
  const content = document.createElement('span');
  content.className = 'content';
  content.textContent = text;
  msg.appendChild(content);
  if (meta) {
    const m = document.createElement('div');
    m.className = 'meta';
    m.textContent = meta;
    msg.appendChild(m);
  }
  container.appendChild(msg);
  container.scrollTop = container.scrollHeight;
  return msg;
}

export function appendToMessage(msgEl, text) {
  const content = msgEl.querySelector('.content');
  if (content) {
    content.textContent += text;
  } else {
    msgEl.textContent += text;
  }
  msgEl.parentElement.scrollTop = msgEl.parentElement.scrollHeight;
}

export function setStatus(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

export function show(id, display = 'block') {
  const e = document.getElementById(id);
  if (e) e.style.display = display;
}

export function hide(id) {
  const e = document.getElementById(id);
  if (e) e.style.display = 'none';
}

export function getInput() {
  return { text: el('chat-input').value.trim() };
}

export function clearInput() {
  el('chat-input').value = '';
}
