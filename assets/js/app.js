const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }));
}
const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();

const downloadDialog = document.querySelector('[data-download-dialog]');
const downloadConfirm = document.querySelector('[data-download-confirm]');
const downloadCountdown = document.querySelector('[data-download-countdown]');
const downloadCancel = document.querySelector('[data-download-cancel]');

if (downloadDialog && downloadConfirm && downloadCountdown && downloadCancel && typeof downloadDialog.showModal === 'function') {
  let countdownTimer;
  let secondsRemaining = 10;

  const stopCountdown = () => {
    window.clearInterval(countdownTimer);
    countdownTimer = undefined;
  };

  const beginDownload = () => {
    stopCountdown();
    if (downloadDialog.open) downloadDialog.close();
    window.location.assign(downloadConfirm.href);
  };

  document.querySelectorAll('[data-download-trigger]').forEach(trigger => {
    trigger.addEventListener('click', event => {
      event.preventDefault();
      if (downloadDialog.open) return;

      secondsRemaining = 10;
      downloadCountdown.textContent = String(secondsRemaining);
      downloadDialog.showModal();
      countdownTimer = window.setInterval(() => {
        secondsRemaining -= 1;
        downloadCountdown.textContent = String(secondsRemaining);
        if (secondsRemaining === 0) beginDownload();
      }, 1000);
    });
  });

  downloadConfirm.addEventListener('click', () => {
    stopCountdown();
    downloadDialog.close();
  });
  downloadCancel.addEventListener('click', () => {
    stopCountdown();
    downloadDialog.close();
  });
  downloadDialog.addEventListener('cancel', stopCountdown);
  downloadDialog.addEventListener('close', stopCountdown);
}
