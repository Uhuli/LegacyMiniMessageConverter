function convert(legacy, concise, char, rgb) {
    let miniMessage = legacy.replaceAll(char + "0", "<black>")
        .replaceAll(char + "1", "<dark_blue>")
        .replaceAll(char + "2", "<dark_green>")
        .replaceAll(char + "3", "<dark_aqua>")
        .replaceAll(char + "4", "<dark_red>")
        .replaceAll(char + "5", "<dark_purple>")
        .replaceAll(char + "6", "<gold>")
        .replaceAll(char + "7", "<gray>")
        .replaceAll(char + "8", "<dark_gray>")
        .replaceAll(char + "9", "<blue>")
        .replaceAll(char + "a", "<green>")
        .replaceAll(char + "b", "<aqua>")
        .replaceAll(char + "c", "<red>")
        .replaceAll(char + "d", "<light_purple>")
        .replaceAll(char + "e", "<yellow>")
        .replaceAll(char + "f", "<white>");

    if (concise) {
        miniMessage = miniMessage.replaceAll(char + "n", "<u>")
            .replaceAll(char + "m", "<st>")
            .replaceAll(char + "k", "<obf>")
            .replaceAll(char + "o", "<i>")
            .replaceAll(char + "l", "<b>")
            .replaceAll(char + "r", "<r>");
    } else {
        miniMessage = miniMessage.replaceAll(char + "n", "<underlined>")
            .replaceAll(char + "m", "<strikethrough>")
            .replaceAll(char + "k", "<obfuscated>")
            .replaceAll(char + "o", "<italic>")
            .replaceAll(char + "l", "<bold>")
            .replaceAll(char + "r", "<reset>");
    }

    if (rgb) {
        const matcher = new RegExp(char + "#([0-9a-fA-F]{6})", "g");
        miniMessage = miniMessage.replace(matcher, "<#$1>");
    }

    return miniMessage;
}

function addListeners() {
    const textElement = document.getElementById("text");
    const conciseElement = document.getElementById("concise");
    const charElement = document.getElementById("char");
    const rgbElement = document.getElementById("rgb");
    const previewElement = document.getElementById("preview");
    const copyButton = document.getElementById("copyButton");

    textElement.addEventListener("input", () => {
        updatePreview();
    });
    conciseElement.addEventListener("change", () => updatePreview());
    charElement.addEventListener("change", () => updatePreview());
    rgbElement.addEventListener("change", () => updatePreview());

    copyButton.addEventListener("click", () => {
        navigator.clipboard.writeText(previewElement.textContent)
            .then(() => {
                copyButton.textContent = "Copied!";
                copyButton.classList.add("copied");
                setTimeout(() => {
                    copyButton.textContent = "Copy to Clipboard";
                    copyButton.classList.remove("copied");
                }, 2000);
            })
            .catch(() => {
                copyButton.textContent = "Failed!";
                setTimeout(() => {
                    copyButton.textContent = "Copy to Clipboard";
                }, 2000);
            });
    });

    function updatePreview() {
        const text = textElement.value;
        const concise = conciseElement.checked;
        const char = charElement.value;
        const rgb = rgbElement.checked;
        const convertedText = convert(text, concise, char, rgb);
        previewElement.textContent = convertedText;
        previewElement.style.height = 'auto';
        previewElement.style.height = `${previewElement.scrollHeight}px`;
    }

    const themeToggle = document.getElementById("themeToggle");
    themeToggle.addEventListener("change", () => {
        const elements = [document.body, textElement, conciseElement, charElement, rgbElement, previewElement, copyButton];
        elements.forEach(el => el.classList.toggle("light-mode", themeToggle.checked));
    });
}

document.addEventListener("DOMContentLoaded", addListeners);