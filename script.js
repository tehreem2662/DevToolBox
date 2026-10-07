/* =========================================================
   DevToolBox - Shared JavaScript
   6 Functional Tools
   ========================================================= */


/* =========================================================
   1. PASSWORD GENERATOR
   ========================================================= */

const passwordOutput = document.querySelector(".password-output");
const lengthSlider = document.querySelector(".length-slider");
const lengthValue = document.querySelector(".length-value");

const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");

const generateBtn = document.querySelector(".generate-btn");
const copyPasswordBtn = document.querySelector(".copy-btn");

const strengthValue = document.querySelector(".strength-value");
const strengthFill = document.querySelector(".strength-fill");

if (passwordOutput && lengthSlider) {

    const uppercaseChars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    const lowercaseChars =
        "abcdefghijklmnopqrstuvwxyz";

    const numberChars =
        "0123456789";

    const symbolChars =
        "!@#$%^&*()_+-=[]{}|;:,.<>?";


    function generatePassword() {

        let characters = "";
        let password = "";


        if (uppercaseCheck && uppercaseCheck.checked) {
            characters += uppercaseChars;
        }

        if (lowercaseCheck && lowercaseCheck.checked) {
            characters += lowercaseChars;
        }

        if (numbersCheck && numbersCheck.checked) {
            characters += numberChars;
        }

        if (symbolsCheck && symbolsCheck.checked) {
            characters += symbolChars;
        }


        if (characters.length === 0) {

            passwordOutput.textContent =
                "Select at least one option";

            return;
        }


        const length =
            parseInt(lengthSlider.value);


        for (let i = 0; i < length; i++) {

            const randomIndex =
                Math.floor(
                    Math.random() *
                    characters.length
                );

            password +=
                characters[randomIndex];
        }


        passwordOutput.textContent =
            password;


        updatePasswordStrength(password);
    }


    function updatePasswordStrength(password) {

        if (!strengthValue || !strengthFill) {
            return;
        }


        let score = 0;


        if (password.length >= 8) {
            score++;
        }

        if (password.length >= 12) {
            score++;
        }

        if (/[A-Z]/.test(password)) {
            score++;
        }

        if (/[a-z]/.test(password)) {
            score++;
        }

        if (/[0-9]/.test(password)) {
            score++;
        }

        if (/[^A-Za-z0-9]/.test(password)) {
            score++;
        }


        if (score <= 2) {

            strengthValue.textContent =
                "Weak";

            strengthFill.style.width =
                "30%";

        } else if (score <= 4) {

            strengthValue.textContent =
                "Medium";

            strengthFill.style.width =
                "65%";

        } else {

            strengthValue.textContent =
                "Strong";

            strengthFill.style.width =
                "100%";
        }
    }


    lengthSlider.addEventListener(
        "input",
        function () {

            if (lengthValue) {
                lengthValue.textContent =
                    this.value;
            }

            generatePassword();
        }
    );


    [
        uppercaseCheck,
        lowercaseCheck,
        numbersCheck,
        symbolsCheck
    ]
        .filter(Boolean)
        .forEach(function (checkbox) {

            checkbox.addEventListener(
                "change",
                generatePassword
            );

        });


    if (generateBtn) {

        generateBtn.addEventListener(
            "click",
            generatePassword
        );
    }


    if (copyPasswordBtn) {

        copyPasswordBtn.addEventListener(
            "click",
            function () {

                const password =
                    passwordOutput.textContent;


                if (
                    password &&
                    password !==
                    "Select at least one option"
                ) {

                    navigator.clipboard.writeText(
                        password
                    );


                    const originalText =
                        copyPasswordBtn.innerHTML;


                    copyPasswordBtn.innerHTML =
                        "Copied ✓";


                    setTimeout(
                        function () {

                            copyPasswordBtn.innerHTML =
                                originalText;

                        },
                        1500
                    );
                }
            }
        );
    }


    generatePassword();
}


/* =========================================================
   2. TEXT TOOLKIT
   ========================================================= */

const textArea =
    document.querySelector(".text-area");

const characterCount =
    document.querySelector("#characterCount");

const wordCount =
    document.querySelector("#wordCount");

const lineCount =
    document.querySelector("#lineCount");

const spaceCount =
    document.querySelector("#spaceCount");

const uppercaseBtn =
    document.querySelector("#uppercaseBtn");

const lowercaseBtn =
    document.querySelector("#lowercaseBtn");

const removeSpacesBtn =
    document.querySelector("#removeSpacesBtn");

const copyTextBtn =
    document.querySelector("#copyTextBtn");

const clearTextBtn =
    document.querySelector("#clearTextBtn");

const capitalizeBtn =
    document.querySelector("#capitalizeBtn");


if (textArea) {


    function updateTextStats() {

        const text =
            textArea.value;


        if (characterCount) {

            characterCount.textContent =
                text.length;
        }


        if (wordCount) {

            const words =
                text.trim();


            wordCount.textContent =
                words === ""
                    ? 0
                    : words.split(/\s+/).length;
        }


        if (lineCount) {

            lineCount.textContent =
                text === ""
                    ? 0
                    : text.split(/\r?\n/).length;
        }


        if (spaceCount) {

            const spaces =
                text.match(/ /g);


            spaceCount.textContent =
                spaces
                    ? spaces.length
                    : 0;
        }
    }


    textArea.addEventListener(
        "input",
        updateTextStats
    );


    if (uppercaseBtn) {

        uppercaseBtn.addEventListener(
            "click",
            function () {

                textArea.value =
                    textArea.value.toUpperCase();

                updateTextStats();
            }
        );
    }


    if (lowercaseBtn) {

        lowercaseBtn.addEventListener(
            "click",
            function () {

                textArea.value =
                    textArea.value.toLowerCase();

                updateTextStats();
            }
        );
    }


    if (removeSpacesBtn) {

        removeSpacesBtn.addEventListener(
            "click",
            function () {

                textArea.value =
                    textArea.value
                        .replace(/\s+/g, " ")
                        .trim();

                updateTextStats();
            }
        );
    }


    if (capitalizeBtn) {

        capitalizeBtn.addEventListener(
            "click",
            function () {

                textArea.value =
                    textArea.value
                        .toLowerCase()
                        .replace(
                            /\b\w/g,
                            function (letter) {
                                return letter.toUpperCase();
                            }
                        );

                updateTextStats();
            }
        );
    }


    if (copyTextBtn) {

        copyTextBtn.addEventListener(
            "click",
            function () {

                if (!textArea.value) {
                    return;
                }


                navigator.clipboard.writeText(
                    textArea.value
                );


                const originalText =
                    copyTextBtn.innerHTML;


                copyTextBtn.innerHTML =
                    "Copied ✓";


                setTimeout(
                    function () {

                        copyTextBtn.innerHTML =
                            originalText;

                    },
                    1500
                );
            }
        );
    }


    if (clearTextBtn) {

        clearTextBtn.addEventListener(
            "click",
            function () {

                textArea.value = "";

                updateTextStats();
            }
        );
    }


    updateTextStats();
}


/* =========================================================
   3. JSON FORMATTER
   ========================================================= */

const jsonInput =
    document.querySelector("#jsonInput");

const jsonResult =
    document.querySelector("#jsonResult");

const jsonStatus =
    document.querySelector("#jsonStatus");

const formatJsonBtn =
    document.querySelector("#formatJsonBtn");

const minifyJsonBtn =
    document.querySelector("#minifyJsonBtn");

const validateJsonBtn =
    document.querySelector("#validateJsonBtn");

const copyJsonBtn =
    document.querySelector("#copyJsonBtn");


if (jsonInput) {


    function showJsonStatus(
        message,
        type
    ) {

        if (!jsonStatus) {
            return;
        }


        jsonStatus.textContent =
            message;


        jsonStatus.classList.remove(
            "valid",
            "invalid"
        );


        if (type === "valid") {

            jsonStatus.classList.add(
                "valid"
            );
        }


        if (type === "invalid") {

            jsonStatus.classList.add(
                "invalid"
            );
        }
    }


    function parseJson() {

        return JSON.parse(
            jsonInput.value
        );
    }


    /* FORMAT */

    if (formatJsonBtn) {

        formatJsonBtn.addEventListener(
            "click",
            function () {

                const input =
                    jsonInput.value.trim();


                if (!input) {

                    showJsonStatus(
                        "✕ Please enter JSON first.",
                        "invalid"
                    );


                    jsonResult.innerHTML =
                        '<span class="result-placeholder">' +
                        'Please enter JSON to format.' +
                        '</span>';

                    return;
                }


                try {

                    const data =
                        parseJson();


                    const formatted =
                        JSON.stringify(
                            data,
                            null,
                            4
                        );


                    jsonResult.textContent =
                        formatted;


                    showJsonStatus(
                        "✓ Valid JSON — formatted successfully.",
                        "valid"
                    );

                } catch (error) {

                    jsonResult.innerHTML =
                        '<span class="result-placeholder">' +
                        'Invalid JSON. Please check your syntax.' +
                        '</span>';


                    showJsonStatus(
                        "✕ Invalid JSON!",
                        "invalid"
                    );
                }
            }
        );
    }


    /* MINIFY */

    if (minifyJsonBtn) {

        minifyJsonBtn.addEventListener(
            "click",
            function () {

                const input =
                    jsonInput.value.trim();


                if (!input) {

                    showJsonStatus(
                        "✕ Please enter JSON first.",
                        "invalid"
                    );


                    jsonResult.innerHTML =
                        '<span class="result-placeholder">' +
                        'Please enter JSON to minify.' +
                        '</span>';

                    return;
                }


                try {

                    const data =
                        parseJson();


                    const minified =
                        JSON.stringify(data);


                    jsonResult.textContent =
                        minified;


                    showJsonStatus(
                        "✓ Valid JSON — minified successfully.",
                        "valid"
                    );

                } catch (error) {

                    jsonResult.innerHTML =
                        '<span class="result-placeholder">' +
                        'Invalid JSON. Please check your syntax.' +
                        '</span>';


                    showJsonStatus(
                        "✕ Invalid JSON!",
                        "invalid"
                    );
                }
            }
        );
    }


    /* VALIDATE */

    if (validateJsonBtn) {

        validateJsonBtn.addEventListener(
            "click",
            function () {

                const input =
                    jsonInput.value.trim();


                if (!input) {

                    showJsonStatus(
                        "✕ Please enter JSON first.",
                        "invalid"
                    );


                    jsonResult.innerHTML =
                        '<span class="result-placeholder">' +
                        'Nothing to validate.' +
                        '</span>';

                    return;
                }


                try {

                    parseJson();


                    showJsonStatus(
                        "✓ Valid JSON!",
                        "valid"
                    );


                    jsonResult.innerHTML =
                        '<span class="result-placeholder">' +
                        'Your JSON syntax is valid.' +
                        '</span>';

                } catch (error) {

                    showJsonStatus(
                        "✕ Invalid JSON!",
                        "invalid"
                    );


                    jsonResult.innerHTML =
                        '<span class="result-placeholder">' +
                        'Your JSON contains a syntax error.' +
                        '</span>';
                }
            }
        );
    }


    /* COPY */

    if (copyJsonBtn) {

        copyJsonBtn.addEventListener(
            "click",
            function () {

                const result =
                    jsonResult.textContent.trim();


                if (!result) {
                    return;
                }


                if (
                    result.includes(
                        "Please enter JSON"
                    ) ||
                    result.includes(
                        "Invalid JSON"
                    ) ||
                    result.includes(
                        "Nothing to validate"
                    ) ||
                    result.includes(
                        "Your JSON syntax is valid"
                    ) ||
                    result.includes(
                        "Your JSON contains a syntax error"
                    )
                ) {
                    return;
                }


                navigator.clipboard.writeText(
                    result
                );


                const originalText =
                    copyJsonBtn.innerHTML;


                copyJsonBtn.innerHTML =
                    "Copied ✓";


                setTimeout(
                    function () {

                        copyJsonBtn.innerHTML =
                            originalText;

                    },
                    1500
                );
            }
        );
    }
}


/* =========================================================
   4. COLOR CONVERTER
   ========================================================= */

const hexInput =
    document.querySelector("#hexInput");

const colorPicker =
    document.querySelector("#colorPicker");

const colorPreview =
    document.querySelector("#colorPreview");

const previewLabel =
    document.querySelector("#previewLabel");

const hexValue =
    document.querySelector("#hexValue");

const rgbValue =
    document.querySelector("#rgbValue");

const hslValue =
    document.querySelector("#hslValue");

const colorStatus =
    document.querySelector("#colorStatus");


if (hexInput && colorPreview) {


    function normalizeHex(hex) {

        hex =
            hex.trim();


        if (!hex.startsWith("#")) {

            hex =
                "#" + hex;
        }


        if (
            /^#[0-9A-Fa-f]{3}$/.test(hex)
        ) {

            hex =
                "#" +
                hex[1] + hex[1] +
                hex[2] + hex[2] +
                hex[3] + hex[3];
        }


        return hex.toUpperCase();
    }


    function hexToRgb(hex) {

        const cleanHex =
            hex.replace("#", "");


        const r =
            parseInt(
                cleanHex.substring(0, 2),
                16
            );


        const g =
            parseInt(
                cleanHex.substring(2, 4),
                16
            );


        const b =
            parseInt(
                cleanHex.substring(4, 6),
                16
            );


        return {
            r,
            g,
            b
        };
    }


    function rgbToHsl(r, g, b) {

        r /= 255;
        g /= 255;
        b /= 255;


        const max =
            Math.max(r, g, b);

        const min =
            Math.min(r, g, b);


        let h;
        let s;


        const l =
            (max + min) / 2;


        if (max === min) {

            h = 0;
            s = 0;

        } else {

            const difference =
                max - min;


            s =
                l > 0.5
                    ? difference /
                      (2 - max - min)
                    : difference /
                      (max + min);


            switch (max) {

                case r:

                    h =
                        (g - b) /
                        difference +
                        (g < b ? 6 : 0);

                    break;


                case g:

                    h =
                        (b - r) /
                        difference +
                        2;

                    break;


                case b:

                    h =
                        (r - g) /
                        difference +
                        4;

                    break;
            }


            h /= 6;
        }


        return {

            h: Math.round(h * 360),

            s: Math.round(s * 100),

            l: Math.round(l * 100)
        };
    }


    function updateColor() {

        let hex =
            normalizeHex(
                hexInput.value
            );


        if (
            !/^#[0-9A-F]{6}$/i.test(hex)
        ) {

            if (colorStatus) {

                colorStatus.textContent =
                    "✕ Please enter a valid HEX color.";

                colorStatus.classList.remove(
                    "success"
                );

                colorStatus.classList.add(
                    "error"
                );
            }


            return;
        }


        hexInput.value =
            hex;


        if (colorPicker) {

            colorPicker.value =
                hex;
        }


        const rgb =
            hexToRgb(hex);


        const hsl =
            rgbToHsl(
                rgb.r,
                rgb.g,
                rgb.b
            );


        colorPreview.style.backgroundColor =
            hex;


        if (previewLabel) {

            previewLabel.textContent =
                hex;
        }


        if (hexValue) {

            hexValue.textContent =
                hex;
        }


        if (rgbValue) {

            rgbValue.textContent =
                `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
        }


        if (hslValue) {

            hslValue.textContent =
                `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
        }


        if (colorStatus) {

            colorStatus.textContent =
                "✓ Color converted successfully.";

            colorStatus.classList.remove(
                "error"
            );

            colorStatus.classList.add(
                "success"
            );
        }
    }


    hexInput.addEventListener(
        "input",
        updateColor
    );


    if (colorPicker) {

        colorPicker.addEventListener(
            "input",
            function () {

                hexInput.value =
                    this.value.toUpperCase();

                updateColor();
            }
        );
    }


    const colorCopyButtons =
        document.querySelectorAll(
            ".copy-color-btn"
        );


    colorCopyButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const targetId =
                        button.getAttribute(
                            "data-target"
                        );


                    const target =
                        document.getElementById(
                            targetId
                        );


                    if (!target) {
                        return;
                    }


                    navigator.clipboard.writeText(
                        target.textContent
                    );


                    const originalText =
                        button.innerHTML;


                    button.innerHTML =
                        "Copied ✓";


                    setTimeout(
                        function () {

                            button.innerHTML =
                                originalText;

                        },
                        1500
                    );
                }
            );
        }
    );


    updateColor();
}


/* =========================================================
   5. URL ENCODER / DECODER
   ========================================================= */

const urlInput =
    document.querySelector("#urlInput");

const urlResult =
    document.querySelector("#urlResult");

const urlStatus =
    document.querySelector("#urlStatus");

const encodeUrlBtn =
    document.querySelector("#encodeUrlBtn");

const decodeUrlBtn =
    document.querySelector("#decodeUrlBtn");

const clearUrlBtn =
    document.querySelector("#clearUrlBtn");

const copyUrlBtn =
    document.querySelector("#copyUrlBtn");


if (urlInput) {


    function showUrlStatus(
        message,
        type
    ) {

        if (!urlStatus) {
            return;
        }


        urlStatus.textContent =
            message;


        urlStatus.classList.remove(
            "success",
            "error"
        );


        if (type) {

            urlStatus.classList.add(
                type
            );
        }
    }


    /* ENCODE */

    if (encodeUrlBtn) {

        encodeUrlBtn.addEventListener(
            "click",
            function () {

                const input =
                    urlInput.value;


                if (!input.trim()) {

                    showUrlStatus(
                        "Please enter text or URL first.",
                        "error"
                    );

                    return;
                }


                try {

                    if (urlResult) {

                        urlResult.value =
                            encodeURIComponent(
                                input
                            );
                    }


                    showUrlStatus(
                        "✓ URL encoded successfully.",
                        "success"
                    );

                } catch (error) {

                    showUrlStatus(
                        "✕ Unable to encode the input.",
                        "error"
                    );
                }
            }
        );
    }


    /* DECODE */

    if (decodeUrlBtn) {

        decodeUrlBtn.addEventListener(
            "click",
            function () {

                const input =
                    urlInput.value;


                if (!input.trim()) {

                    showUrlStatus(
                        "Please enter encoded text first.",
                        "error"
                    );

                    return;
                }


                try {

                    if (urlResult) {

                        urlResult.value =
                            decodeURIComponent(
                                input
                            );
                    }


                    showUrlStatus(
                        "✓ URL decoded successfully.",
                        "success"
                    );

                } catch (error) {

                    showUrlStatus(
                        "✕ Invalid encoded URL.",
                        "error"
                    );
                }
            }
        );
    }


    /* CLEAR */

    if (clearUrlBtn) {

        clearUrlBtn.addEventListener(
            "click",
            function () {

                urlInput.value =
                    "";


                if (urlResult) {

                    urlResult.value =
                        "";
                }


                showUrlStatus(
                    "",
                    ""
                );
            }
        );
    }


    /* COPY */

    if (copyUrlBtn) {

        copyUrlBtn.addEventListener(
            "click",
            function () {

                if (
                    !urlResult ||
                    !urlResult.value
                ) {
                    return;
                }


                navigator.clipboard.writeText(
                    urlResult.value
                );


                const originalText =
                    copyUrlBtn.innerHTML;


                copyUrlBtn.innerHTML =
                    "Copied ✓";


                setTimeout(
                    function () {

                        copyUrlBtn.innerHTML =
                            originalText;

                    },
                    1500
                );
            }
        );
    }
}


/* =========================================================
   6. DUPLICATE LINE REMOVER
   ========================================================= */

const duplicateInput =
    document.querySelector(
        "#duplicateInput"
    );

const duplicateOutput =
    document.querySelector(
        "#duplicateOutput"
    );

const inputLineCount =
    document.querySelector(
        "#inputLineCount"
    );

const outputLineCount =
    document.querySelector(
        "#outputLineCount"
    );

const ignoreCase =
    document.querySelector(
        "#ignoreCase"
    );

const removeEmptyLines =
    document.querySelector(
        "#removeEmptyLines"
    );

const trimLines =
    document.querySelector(
        "#trimLines"
    );

const removeDuplicatesBtn =
    document.querySelector(
        "#removeDuplicatesBtn"
    );

const copyDuplicatesBtn =
    document.querySelector(
        "#copyDuplicatesBtn"
    );

const clearDuplicatesBtn =
    document.querySelector(
        "#clearDuplicatesBtn"
    );

const duplicateStatus =
    document.querySelector(
        "#duplicateStatus"
    );


if (duplicateInput) {


    function updateDuplicateLineCounts() {

        const text =
            duplicateInput.value;


        if (inputLineCount) {

            inputLineCount.textContent =
                text === ""
                    ? "0"
                    : text.split(/\r?\n/).length;
        }


        if (
            duplicateOutput &&
            outputLineCount
        ) {

            const outputText =
                duplicateOutput.value;


            outputLineCount.textContent =
                outputText === ""
                    ? "0"
                    : outputText.split(/\r?\n/).length;
        }
    }


    function showDuplicateStatus(
        message,
        type
    ) {

        if (!duplicateStatus) {
            return;
        }


        duplicateStatus.textContent =
            message;


        duplicateStatus.classList.remove(
            "success",
            "error"
        );


        if (type) {

            duplicateStatus.classList.add(
                type
            );
        }
    }


    function removeDuplicateLines() {

        const inputText =
            duplicateInput.value;


        if (!inputText.trim()) {

            if (duplicateOutput) {

                duplicateOutput.value =
                    "";
            }


            updateDuplicateLineCounts();


            showDuplicateStatus(
                "Please enter some lines first.",
                "error"
            );


            return;
        }


        let lines =
            inputText.split(/\r?\n/);


        if (
            removeEmptyLines &&
            removeEmptyLines.checked
        ) {

            lines =
                lines.filter(
                    function (line) {

                        return line.trim() !== "";

                    }
                );
        }


        const seen =
            new Set();


        const uniqueLines =
            [];


        let duplicateCount =
            0;


        lines.forEach(
            function (line) {

                let outputLine =
                    line;


                if (
                    trimLines &&
                    trimLines.checked
                ) {

                    outputLine =
                        line.trim();
                }


                let comparisonLine =
                    outputLine;


                if (
                    ignoreCase &&
                    ignoreCase.checked
                ) {

                    comparisonLine =
                        comparisonLine.toLowerCase();
                }


                if (
                    seen.has(
                        comparisonLine
                    )
                ) {

                    duplicateCount++;

                } else {

                    seen.add(
                        comparisonLine
                    );


                    uniqueLines.push(
                        outputLine
                    );
                }
            }
        );


        if (duplicateOutput) {

            duplicateOutput.value =
                uniqueLines.join("\n");
        }


        updateDuplicateLineCounts();


        if (duplicateCount === 0) {

            showDuplicateStatus(
                "✓ No duplicate lines found.",
                "success"
            );

        } else {

            showDuplicateStatus(
                `✓ Removed ${duplicateCount} duplicate ${
                    duplicateCount === 1
                        ? "line"
                        : "lines"
                }.`,
                "success"
            );
        }
    }


    duplicateInput.addEventListener(
        "input",
        updateDuplicateLineCounts
    );


    if (removeDuplicatesBtn) {

        removeDuplicatesBtn.addEventListener(
            "click",
            removeDuplicateLines
        );
    }


    if (copyDuplicatesBtn) {

        copyDuplicatesBtn.addEventListener(
            "click",
            function () {

                if (
                    !duplicateOutput ||
                    !duplicateOutput.value
                ) {
                    return;
                }


                navigator.clipboard.writeText(
                    duplicateOutput.value
                );


                const originalText =
                    copyDuplicatesBtn.innerHTML;


                copyDuplicatesBtn.innerHTML =
                    "Copied ✓";


                setTimeout(
                    function () {

                        copyDuplicatesBtn.innerHTML =
                            originalText;

                    },
                    1500
                );
            }
        );
    }


    if (clearDuplicatesBtn) {

        clearDuplicatesBtn.addEventListener(
            "click",
            function () {

                duplicateInput.value =
                    "";


                if (duplicateOutput) {

                    duplicateOutput.value =
                        "";
                }


                if (inputLineCount) {

                    inputLineCount.textContent =
                        "0";
                }


                if (outputLineCount) {

                    outputLineCount.textContent =
                        "0";
                }


                showDuplicateStatus(
                    "",
                    ""
                );
            }
        );
    }


    updateDuplicateLineCounts();
}


/* =========================================================
   DEVTOOLBOX - END
   ========================================================= */
