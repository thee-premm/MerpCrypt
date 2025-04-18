// 🔐 Caesar Cipher + Emoji Mapping
function caesarEncrypt(text, pin) {
    const shift = parseInt(pin) % 26;

    const emojiMap = [
        "😀","😃","😄","😁","😆","😅","😂","🤣","😊","😇",
        "🙂","🙃","😉","😌","😍","😘","😗","😙","😚","😋",
        "😜","😝","😛","🤑","🤗","🤩"
    ];

    return text.split('').map(char => {
        if (char.match(/[a-z]/)) {
            let shifted = (char.charCodeAt(0) - 97 + shift) % 26;
            return emojiMap[shifted];
        } else if (char.match(/[A-Z]/)) {
            let shifted = (char.charCodeAt(0) - 65 + shift) % 26;
            return emojiMap[shifted];
        } else {
            return char;
        }
    }).join('');
}

// 🔓 Emoji + Caesar Decryption
function caesarDecrypt(text, pin) {
    const shift = parseInt(pin) % 26;

    const emojiMap = [
        "😀","😃","😄","😁","😆","😅","😂","🤣","😊","😇",
        "🙂","🙃","😉","😌","😍","😘","😗","😙","😚","😋",
        "😜","😝","😛","🤑","🤗","🤩"
    ];

    return [...text].map(char => {
        const index = emojiMap.indexOf(char);
        if (index !== -1) {
            const originalIndex = (index - shift + 26) % 26;
            return String.fromCharCode(originalIndex + 97); // Always lowercase
        } else {
            return char;
        }
    }).join('');
}

// 🎯 DOM Elements - Encryption
const encryptBtn = document.querySelector('.encrypt_button');
const encryptInput = document.querySelector('.encryption_input');
const encryptOutput = document.querySelector('.encryption_output');
const encryptPinInput = document.querySelector('.encryption_sec .pin_container input');
const encryptCopyBtn = document.querySelectorAll('.copy_button')[0];

// 🔒 Encrypt Button Click
encryptBtn.addEventListener('click', () => {
    const message = encryptInput.value.trim();
    const pin = encryptPinInput.value.trim();

    if (!pin || pin.length !== 4 || isNaN(pin)) {
        alert("⚠️ Enter a valid 4-digit PIN like 1234");
        return;
    }

    const encrypted = caesarEncrypt(message, pin);
    encryptOutput.value = encrypted;
});

// 📋 Copy Encrypted Message
encryptCopyBtn.addEventListener('click', () => {
    if (encryptOutput.value !== "") {
        navigator.clipboard.writeText(encryptOutput.value);
        alert("✅ Encrypted message copied to clipboard!");
    }
});

// 🎯 DOM Elements - Decryption
const decryptBtn = document.querySelector('.decrypt_button');
const decryptInput = document.querySelector('.decryption_input');
const decryptOutput = document.querySelector('.decryption_output');
const decryptPinInput = document.querySelector('.decryption_sec .pin_container input');
const decryptCopyBtn = document.querySelectorAll('.copy_button')[1];

// 🔓 Decrypt Button Click
decryptBtn.addEventListener('click', () => {
    const encryptedMsg = decryptInput.value.trim();
    const pin = decryptPinInput.value.trim();

    if (!pin || pin.length !== 4 || isNaN(pin)) {
        alert("⚠️ Please enter the correct 4-digit PIN used during encryption");
        return;
    }

    const decrypted = caesarDecrypt(encryptedMsg, pin);
    decryptOutput.value = decrypted;
});

// 📋 Copy Decrypted Message
decryptCopyBtn.addEventListener('click', () => {
    if (decryptOutput.value !== "") {
        navigator.clipboard.writeText(decryptOutput.value);
        alert("✅ Decrypted message copied to clipboard!");
    }
});
