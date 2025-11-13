document.addEventListener('DOMContentLoaded', () => {
    const statusDot = document.getElementById('status-dot');
    const statusText = document.getElementById('status-text');
    const btnOn = document.getElementById('btn-on');
    const btnOff = document.getElementById('btn-off');
    const deviceIpInput = document.getElementById('device-ip');
    const lastSeen = document.getElementById('last-seen');

    // Correct status function (ON = green, OFF = red)
    function setStatus(isOn) {
        const root = getComputedStyle(document.documentElement);
        statusDot.style.background = isOn
            ? root.getPropertyValue('--success')  // green
            : root.getPropertyValue('--danger');  // red

        statusText.textContent = isOn ? 'ON' : 'OFF';
    }

    // Correct glow logic
    function activateButton(activeBtn) {
        btnOn.classList.remove('active');
        btnOff.classList.remove('active');

        if (activeBtn) activeBtn.classList.add('active');
    }

    // Time update
    function updateLastSeen() {
        const now = new Date();
        lastSeen.textContent = now.toLocaleTimeString();
    }

    // Initial UI state
    setStatus(false);
    activateButton(btnOff);  // OFF glows at start

    // -----------------------------
    // LED ON
    // -----------------------------
    btnOn.addEventListener('click', () => {
        const ip = deviceIpInput.value.trim();
        if (!ip) return alert("⚠️ Enter the device IP address first!");

        fetch(`http://${ip}/LED=ON`)
            .then(res => {
                if (!res.ok) throw new Error("ESP unreachable");

                // LED ON → glow ON
                setStatus(true);
                activateButton(btnOn);
                updateLastSeen();
            })
            .catch(err => {
                console.error(err);
                alert("❌ Device unreachable. Check if NodeMCU is online.");
            });
    });

    // -----------------------------
    // LED OFF
    // -----------------------------
    btnOff.addEventListener('click', () => {
        const ip = deviceIpInput.value.trim();
        if (!ip) return alert("⚠️ Enter the device IP address first!");

        fetch(`http://${ip}/LED=OFF`)
            .then(res => {
                if (!res.ok) throw new Error("ESP unreachable");

                // LED OFF → glow OFF
                setStatus(false);
                activateButton(btnOff);
                updateLastSeen();
            })
            .catch(err => {
                console.error(err);
                alert("❌ Device unreachable. Check if NodeMCU is online.");
            });
    });
});
