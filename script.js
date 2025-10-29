document.addEventListener('DOMContentLoaded', () => {
    const statusDot = document.getElementById('status-dot');
    const statusText = document.getElementById('status-text');
    const btnOn = document.getElementById('btn-on');
    const btnOff = document.getElementById('btn-off');

    function setStatus(connected){
        const root = getComputedStyle(document.documentElement);
        statusDot.style.background = connected ? root.getPropertyValue('--success') : root.getPropertyValue('--danger');
        statusText.textContent = connected ? 'Connected' : 'Disconnected';
    }

    function activateButton(activeBtn){
        btnOn.classList.remove('active');
        btnOff.classList.remove('active');
        if (activeBtn) activeBtn.classList.add('active');
    }

    // initial state
    setStatus(false);
    activateButton(null);

    btnOn.addEventListener('click', () => {
        setStatus(true);
        activateButton(btnOn);
    });

    // OFF click: ensure ON stops glowing; alternate clicks handled by toggling explicitly
    btnOff.addEventListener('click', () => {
        // if OFF already active, revert to ON (remove OFF active)
        if (btnOff.classList.contains('active')) {
            setStatus(true);
            activateButton(btnOn);
        } else {
            setStatus(false);
            activateButton(btnOff);
        }
    });
});
