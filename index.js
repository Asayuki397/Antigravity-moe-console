// Mascot Preset Configurations
const MASCOT_PRESETS = {
    haru: {
        name: "Haru",
        url: "https://cdn.jsdelivr.net/gh/guansss/pixi-live2d-display/test/assets/haru/haru_greeter_t03.model3.json",
        scaleMultiplier: 1.05,
        xOffset: 0,
        yOffset: 25,
        reactions: {
            headpat: { motion: "TapBody", exp: 1, text: "Ah! Master's headpats are the best! My productivity just went up by 500%! (≧∇≦)ﾉ" },
            coffee: { motion: "TapBody", exp: 2, text: "*Gulp gulp* Aaah! Sweet caffeine! Now I can compile code at the speed of light!" },
            poke: { motion: "FlickHead", exp: 3, text: "Hey! That tickles! Keep your cursor on the editor, okay? (o>▽<)o" },
            talk: { motion: "Talk", exp: 0, text: "Did you know? Code written with love and anime mascots has 90% fewer bugs!" },
            build_start: { motion: "Talk", exp: 2, text: "Beginning gravity build process! Stand back, Master, I'm compiling!" },
            build_success: { motion: "TapBody", exp: 1, text: "Build succeeded! Our gravity engine is fully operational! Yay! (✿◠‿◠)" },
            build_error: { motion: "FlickHead", exp: 4, text: "Oh no... compile error! Master, please help me check the logs! ⊙﹏⊙" },
        }
    },
    shizuku: {
        name: "Shizuku",
        url: "https://cdn.jsdelivr.net/gh/guansss/pixi-live2d-display/test/assets/shizuku/shizuku.model.json",
        scaleMultiplier: 1.05,
        xOffset: 0,
        yOffset: 15,
        reactions: {
            headpat: { motion: "tap_body", exp: "smile", text: "Ehehe... headpats make me feel so warm! Let's crush these tasks together! (///▽///)" },
            coffee: { motion: "tap_body", exp: "smile", text: "Wow, coffee! Thank you, Master! I'm fully charged and ready to write code!" },
            poke: { motion: "shake", exp: "frown", text: "Hyaah! Don't poke me there! Focus on the workspace! ( > < )" },
            talk: { motion: "talk", exp: "smile", text: "I'm checking the directory for updates. Tell me what to code next!" },
            build_start: { motion: "talk", exp: "talk", text: "Starting build tasks! I'm monitoring the CPU nodes!" },
            build_success: { motion: "tap_body", exp: "smile", text: "All systems green! The build compiled successfully! Excellent job!" },
            build_error: { motion: "shake", exp: "cry", text: "A compilation failure occurred... Let's review the code brackets, Master." }
        }
    },
    pio: {
        name: "Pio",
        url: "https://cdn.jsdelivr.net/gh/fghrsh/live2d_api/model/Potion-Maker/Pio/index.json",
        scaleMultiplier: 1.55,
        xOffset: 0,
        yOffset: -20,
        reactions: {
            headpat: { motion: "happy", exp: null, text: "Hehe, headpats! Pio will work extra hard for Master now! ♪(^∇^*)" },
            coffee: { motion: "happy", exp: null, text: "Ooh, coffee! It's bitter but sweet! Pio's motivation is maxed out!" },
            poke: { motion: "sad", exp: null, text: "Ah! Master poked Pio! Did Pio do something wrong? ( ﾟдﾟ)" },
            talk: { motion: "touch", exp: null, text: "Pio is brewing some fresh scripts for our build environment!" },
            build_start: { motion: "touch", exp: null, text: "Pio is starting the compiler engine! Keep cheering for me!" },
            build_success: { motion: "happy", exp: null, text: "Ta-da! Pio finished compiling successfully! Do I get a headpat?" },
            build_error: { motion: "sad", exp: null, text: "Oh no... the magic formula failed... Pio feels so apologetic..." }
        }
    },
    tia: {
        name: "Tia",
        url: "https://cdn.jsdelivr.net/gh/fghrsh/live2d_api/model/Potion-Maker/Tia/index.json",
        scaleMultiplier: 1.55,
        xOffset: 0,
        yOffset: -20,
        reactions: {
            headpat: { motion: "happy", exp: null, text: "Mmm, headpats... Tia is very happy that Master cares. (*^-^*)" },
            coffee: { motion: "happy", exp: null, text: "Thank you for the coffee. Tia's focus has increased. Let's finish the tasks." },
            poke: { motion: "sad", exp: null, text: "Master, please don't tease Tia. We have modules to build. (v_v)" },
            talk: { motion: "touch", exp: null, text: "Tia is analyzing the project files. Everything seems orderly." },
            build_start: { motion: "touch", exp: null, text: "Activating the build stream. Computing files..." },
            build_success: { motion: "happy", exp: null, text: "Build success. All features are verified. Tia is pleased." },
            build_error: { motion: "sad", exp: null, text: "The task encountered a fatal error. Tia is looking for solutions." }
        }
    },
    custom: {
        name: "Custom Mascot",
        url: "", // Loaded dynamically from input
        scaleMultiplier: 1.15,
        xOffset: 0,
        yOffset: 0,
        reactions: {
            headpat: { motion: null, exp: null, text: "Ah! Master's headpats are wonderful! (*^.^*) ♡" },
            coffee: { motion: null, exp: null, text: "Mmm, coffee! My motivation is fully restored! Let's code!" },
            poke: { motion: null, exp: null, text: "Hyaah! Don't tickle me, Master! ( > < )" },
            talk: { motion: null, exp: null, text: "I'm monitoring our custom scripts. Ready to build when you are!" },
            build_start: { motion: null, exp: null, text: "Rebuilding our custom modules now. Watch the terminal!" },
            build_success: { motion: null, exp: null, text: "Hurray! The project compiled successfully! Let's deploy!" },
            build_error: { motion: null, exp: null, text: "Oh no... a syntax error occurred. Let's fix it!" }
        }
    }
};

// Global App States
let currentMascotKey = 'haru';
let affectionPoints = 30; // 0 to 99 %
let affectionLevel = 1;   // 1 to 100 Level
let motivationLevel = 95; // Scale 0 to 100
let pixiApp = null;
let currentModel = null;
let isBuilding = false;
let tokenUsage = 12000; // 12K initial tokens used
const maxTokenQuota = 100000; // 100K token limit

// Task Checklist States
let tasks = [
    { id: 1, text: "Integrate PixiJS and Live2D modules", completed: true, running: false },
    { id: 2, text: "Set up glassmorphism CSS theme structures", completed: true, running: false },
    { id: 3, text: "Create interactive chat input with mascot reactivity", completed: false, running: false },
    { id: 4, text: "Simulate terminal stream output for build loops", completed: false, running: false },
    { id: 5, text: "Run validation suite and verify animations", completed: false, running: false }
];

// Project Files States
let projectFiles = [
    { name: "index.html", type: "html", active: true, size: "2.1 KB" },
    { name: "index.css", type: "css", active: false, size: "12.4 KB" },
    { name: "index.js", type: "js", active: false, size: "8.6 KB" },
    { name: "server.js", type: "js", active: false, size: "1.5 KB" },
    { name: "task.md", type: "md", active: false, size: "320 B" },
    { name: "package.json", type: "json", active: false, size: "480 B" }
];

// Simulated AI Chat Responses
const AI_RESPONSES = [
    {
        keywords: ["build", "compile", "run", "npm"],
        thought: "The user wants to test the compiler stream. I should run a mock compile script and log output to the terminal, while Hiyori/Haru watches.",
        speech: "build_start",
        message: "I am starting a project compilation and build sequence. You will see the standard outputs in the terminal log below. Let's make sure Hiyori oversees the parameters!",
        action: "npm run build --mode=production",
        triggerBuild: true
    },
    {
        keywords: ["error", "bug", "broken", "fail"],
        thought: "Simulating a syntax crash so the user can interact with Hiyori's sad states and fix things.",
        speech: "build_error",
        message: "Oh! It looks like there's a compilation hazard in our layout files! I've printed the compiler trace in the terminal. Hiyori looks very upset about it, let's fix it by clicking 'Build Project' or asking me to rebuild!",
        action: "vite build --inspect-error",
        triggerError: true
    },
    {
        keywords: ["hi", "hello", "hey", "help", "antigravity"],
        thought: "Introduction message, welcoming the user and listing features.",
        speech: "talk",
        message: "Hello, Master! I am Antigravity, your dedicated coding agent. For this Moe Edition, I've brought along a Live2D companion! Here is what we can do:\n\n1. **Chat with me** - Ask me to 'run tests' or 'simulate errors'.\n2. **Click the Mascot** - Try headpatting, giving coffee, or poking her.\n3. **Execute Tasks** - Add items on the Tasks tab, then hit 'Execute Plan'.\n4. **Run Terminal Actions** - Trigger builds and inspect compilation streams."
    },
    {
        keywords: ["approve", "done", "perfect", "good", "love"],
        thought: "Increase affection score, playing happy motion.",
        speech: "build_success",
        message: "Kyaa! Thank you, Master! Getting your approval makes us so happy! I've increased our collaboration affinity metric. Let's keep writing amazing modules!",
        boostAffection: 15
    }
];

const GENERAL_RESPONSES = [
    {
        thought: "Giving a status report on file buffers and gravity levels.",
        speech: "talk",
        message: "I've analyzed our workspace buffers. The layout coordinates look very stable, and memory allocation is fully optimized. Hiyori agrees our syntax is highly elegant! ヽ(✿ﾟ▽ﾟ)ノ"
    },
    {
        thought: "Suggesting committing the current workspace state.",
        speech: "talk",
        message: "Would you like me to commit our progress to git? I've prepared the commit message: `feat: integrate Moe Driven Development with Live2D anime mascot`. It is verified to improve developer focus by 200%!"
    },
    {
        thought: "Encouraging a break/tea.",
        speech: "talk",
        message: "Master, you've been working hard! Make sure to take a sip of water or tea. Your Live2D assistant is cheering you on every step of the way!"
    }
];

// Initialize Everything
document.addEventListener("DOMContentLoaded", () => {
    // Icons
    lucide.createIcons();

    // Tabs
    initTabs();

    // Explorer files
    renderFileTree();

    // Tasks list
    renderTasks();

    // Simulated terminal initial message
    writeTerminalLine("ANTIGRAVITY MOE OS v1.0.0 (Loaded core gravity kernels)", "info");
    writeTerminalLine("Terminal listener ready. Click 'Build Project' or type 'hello' in chat.", "success");

    // Initialize Pixi JS
    initPixi();

    // Chat controls
    initChatControls();

    // Mascot triggers
    initMascotInteractionControls();

    // Footer actions
    initFooterControls();

    // Initialize Quota UI
    updateQuotaUI();

    // Reset Quota listener
    document.getElementById("quota-reset-btn").addEventListener("click", resetTokenQuota);

    // Load Affection data
    initAffection();

    // Load workspace files
    loadWorkspaceFiles();

    // Welcome speech
    updateSpeechBubble("Hello there, Master! Ready to write some code today? Let's build something awesome!");
});

// Tab Navigation
function initTabs() {
    const tabBtns = document.querySelectorAll(".tab-btn");
    tabBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            tabBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const tabId = btn.getAttribute("data-tab");
            document.querySelectorAll(".tab-content").forEach(tc => tc.classList.remove("active"));
            document.getElementById(`tab-${tabId}`).classList.add("active");
        });
    });
}

// File Tree Rendering
function renderFileTree() {
    const tree = document.getElementById("project-file-tree");
    tree.innerHTML = "";
    projectFiles.forEach(file => {
        const li = document.createElement("li");
        li.className = `file-item ${file.active ? 'active' : ''}`;
        
        let icon = "file-code2";
        if (file.type === "html") icon = "file-html";
        else if (file.type === "css") icon = "file-spreadsheet";
        else if (file.type === "md") icon = "file-text";
        else if (file.type === "json") icon = "settings-2";

        li.innerHTML = `
            <i data-lucide="${icon}"></i>
            <span class="file-name">${file.name}</span>
            <span class="file-badge">${file.size}</span>
        `;
        
        li.addEventListener("click", () => {
            document.querySelectorAll(".file-item").forEach(item => item.classList.remove("active"));
            li.classList.add("active");
            writeTerminalLine(`[FS] Opened file: ${file.name} (${file.size})`, "info");
            
            // Mascot quick nod
            triggerMascotMotion("talk");
        });
        
        tree.appendChild(li);
    });
    lucide.createIcons({ attrs: { class: 'lucide-icon' } });
}

async function loadWorkspaceFiles() {
    try {
        const response = await fetch('/files');
        if (response.ok) {
            const remoteFiles = await response.json();
            
            // Retain active file highlighting if possible
            const activeFile = projectFiles.find(f => f.active);
            if (activeFile) {
                const match = remoteFiles.find(f => f.name === activeFile.name);
                if (match) match.active = true;
                else if (remoteFiles.length > 0) remoteFiles[0].active = true;
            } else if (remoteFiles.length > 0) {
                remoteFiles[0].active = true;
            }
            
            projectFiles = remoteFiles;
            renderFileTree();
            return true;
        }
    } catch (e) {
        console.log("Files API unavailable, running in demo mode:", e.message);
    }
    return false;
}

async function simulateNewFile() {
    const fileName = prompt("Enter new filename:");
    if (!fileName) return;
    
    // Try to create file on disk via server
    let createdOnDisk = false;
    try {
        const response = await fetch('/files', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: fileName })
        });
        if (response.ok) {
            createdOnDisk = true;
            await loadWorkspaceFiles();
            writeTerminalLine(`[FS] Created file on disk: ${fileName}`, "success");
        }
    } catch (e) {
        console.log("Server offline, could not write file to disk:", e.message);
    }

    if (!createdOnDisk) {
        // Fallback demo mode
        const ext = fileName.split('.').pop() || 'txt';
        projectFiles.push({
            name: fileName,
            type: ext,
            active: false,
            size: "0 B"
        });
        renderFileTree();
        writeTerminalLine(`[FS] Created file: ${fileName} (Demo Mode)`, "success");
    }
    
    // Mascot cheers
    playMascotReaction("headpat");
}

async function refreshExplorer() {
    writeTerminalLine("[FS] Rescanning workspace directory...", "info");
    const success = await loadWorkspaceFiles();
    if (success) {
        writeTerminalLine(`[FS] ${projectFiles.length} files scanned. Workspace in sync.`, "success");
    } else {
        setTimeout(() => {
            writeTerminalLine(`[FS] ${projectFiles.length} files scanned. Workspace in sync. (Demo Mode)`, "success");
        }, 400);
    }
}

// Task board
function renderTasks() {
    const board = document.getElementById("task-board");
    board.innerHTML = "";

    let completedCount = 0;
    tasks.forEach(task => {
        if (task.completed) completedCount++;

        const li = document.createElement("li");
        li.className = `task-item ${task.completed ? 'completed' : ''}`;
        
        let checkboxClass = task.completed ? "checked" : (task.running ? "running" : "");
        let checkboxIcon = task.completed ? '<i data-lucide="check"></i>' : (task.running ? '<i data-lucide="loader-2"></i>' : '');

        li.innerHTML = `
            <div class="task-checkbox ${checkboxClass}">${checkboxIcon}</div>
            <div class="task-details">
                <span class="task-text">${task.text}</span>
                <div class="task-meta">
                    <span>ID: TS-0${task.id}</span>
                    <span>Status: ${task.completed ? 'Done' : (task.running ? 'Running...' : 'Pending')}</span>
                </div>
            </div>
            <button class="task-delete-btn" title="Delete Task"><i data-lucide="trash-2"></i></button>
        `;

        // Checkbox click to toggle
        const checkBtn = li.querySelector(".task-checkbox");
        checkBtn.addEventListener("click", () => {
            if (isBuilding) return; // Prevent clicking while running execution plans
            task.completed = !task.completed;
            task.running = false;
            
            if (task.completed) {
                playMascotReaction("headpat");
                writeTerminalLine(`[TASK] Marked complete: ${task.text}`, "success");
            } else {
                writeTerminalLine(`[TASK] Reopened task: ${task.text}`, "info");
            }
            renderTasks();
        });

        // Delete button
        const delBtn = li.querySelector(".task-delete-btn");
        delBtn.addEventListener("click", () => {
            tasks = tasks.filter(t => t.id !== task.id);
            writeTerminalLine(`[TASK] Removed task: ${task.text}`, "warning");
            renderTasks();
        });

        board.appendChild(li);
    });

    // Update progress bar
    const total = tasks.length;
    const percentage = total > 0 ? Math.round((completedCount / total) * 100) : 0;
    document.getElementById("task-percentage").innerText = `${percentage}%`;
    document.getElementById("task-progress-bar").style.width = `${percentage}%`;

    lucide.createIcons();
}

// Add task
const addTaskInput = document.getElementById("new-task-input");
const addTaskBtn = document.getElementById("add-task-btn");

function addNewTask() {
    const text = addTaskInput.value.trim();
    if (!text) return;

    const newId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
    tasks.push({
        id: newId,
        text: text,
        completed: false,
        running: false
    });
    addTaskInput.value = "";
    renderTasks();
    writeTerminalLine(`[TASK] Added task: ${text}`, "info");

    // Mascot reacts
    triggerMascotMotion("talk");
}

addTaskBtn.addEventListener("click", addNewTask);
addTaskInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addNewTask();
});

// Run Plan Executor
const runPlanBtn = document.getElementById("run-plan-btn");
runPlanBtn.addEventListener("click", runTaskExecutorPlan);

async function runTaskExecutorPlan() {
    if (tokenUsage >= maxTokenQuota) {
        alert("We are out of tokens! Please click the Quota Bar at the top to refill first!");
        return;
    }

    const pendingTasks = tasks.filter(t => !t.completed);
    if (pendingTasks.length === 0) {
        alert("All tasks are already completed, Master! Add some more!");
        return;
    }

    if (isBuilding) return;
    isBuilding = true;
    runPlanBtn.disabled = true;
    runPlanBtn.innerHTML = `<i data-lucide="loader-2" class="icon-spin"></i> Running Plan...`;
    lucide.createIcons();

    setMascotStatusText("Working");
    updateMotivationLevel(100);

    // Speak build start
    const preset = MASCOT_PRESETS[currentMascotKey];
    updateSpeechBubble(preset.reactions.build_start.text);
    triggerMascotMotion("build_start");

    writeTerminalLine("==========================================", "info");
    writeTerminalLine("[EXEC] Starting approved automation flow...", "command");
    writeTerminalLine(`[EXEC] Total pending tasks: ${pendingTasks.length}`, "info");

    for (let i = 0; i < pendingTasks.length; i++) {
        const task = pendingTasks[i];
        
        // Deduct tokens
        const success = addTokens(3200);
        if (!success) {
            task.running = false;
            renderTasks();
            isBuilding = false;
            runPlanBtn.disabled = false;
            runPlanBtn.innerHTML = `<i data-lucide="play"></i> Execute Approved Plan`;
            lucide.createIcons();
            return;
        }

        // Mark task running in UI
        task.running = true;
        renderTasks();

        writeTerminalLine(`[TASK] Active: TS-0${task.id} - ${task.text}`, "info");
        await delay(1200);

        // Simulate some console stdout
        if (task.id === 3) {
            writeTerminalLine("[STDOUT] Initializing chat protocols...", "info");
            writeTerminalLine("[STDOUT] Live2D response listener mounted.", "info");
        } else if (task.id === 4) {
            writeTerminalLine("[STDOUT] Terminal stream output: piping buffer streams...", "info");
            writeTerminalLine("[STDOUT] Log writer established in /var/logs/terminal.log", "info");
        } else {
            writeTerminalLine(`[STDOUT] Compiling components for node TS-0${task.id}...`, "info");
            writeTerminalLine("[STDOUT] Modules validated successfully.", "success");
        }

        await delay(1000);
        
        // Finish task
        task.completed = true;
        task.running = false;
        renderTasks();
        writeTerminalLine(`[SUCCESS] Completed task TS-0${task.id}`, "success");
        
        // Boost affection slightly
        boostAffection(3);
    }

    // Success finalization
    writeTerminalLine("[EXEC] All tasks executed successfully. Clean exit.", "success");
    writeTerminalLine("==========================================", "success");

    updateSpeechBubble(preset.reactions.build_success.text);
    triggerMascotMotion("build_success");
    setMascotStatusText("Cheerful");
    
    isBuilding = false;
    runPlanBtn.disabled = false;
    runPlanBtn.innerHTML = `<i data-lucide="play"></i> Execute Approved Plan`;
    lucide.createIcons();
}

// Initialize PixiJS and Live2D Model
async function initPixi() {
    const parent = document.getElementById("canvas-parent");
    const canvas = document.getElementById("live2d-canvas");

    // Create PIXI application
    pixiApp = new PIXI.Application({
        view: canvas,
        autoStart: true,
        resizeTo: parent,
        backgroundAlpha: 0, // Transparent canvas so background gradients show through
        antialias: true,
        resolution: window.devicePixelRatio || 1,
        autoDensity: true
    });

    // Handle resizing
    window.addEventListener("resize", () => {
        if (currentModel) {
            resizeModel();
        }
    });

    // Load initial mascot
    const savedMascot = localStorage.getItem('antigravity_active_mascot') || 'haru';
    currentMascotKey = savedMascot;
    mascotSelector.value = savedMascot;
    
    if (savedMascot === 'custom') {
        document.getElementById("custom-model-input-wrapper").style.display = 'flex';
        const savedPath = localStorage.getItem('antigravity_custom_model_path');
        if (savedPath) {
            document.getElementById("custom-model-path").value = savedPath;
        }
    }
    
    await loadMascotModel(currentMascotKey);
}

// Load Mascot Model
async function loadMascotModel(charKey) {
    const spinner = document.getElementById("canvas-loading-spinner");
    spinner.classList.remove("hidden");

    try {
        // Remove previous model
        if (currentModel) {
            pixiApp.stage.removeChild(currentModel);
            currentModel.destroy();
            currentModel = null;
        }

        let preset = MASCOT_PRESETS[charKey];
        if (!preset) return;

        let modelUrl = preset.url;
        if (charKey === 'custom') {
            const customPathInput = document.getElementById("custom-model-path");
            modelUrl = customPathInput.value.trim();
            if (!modelUrl) {
                writeTerminalLine("[Live2D] Please enter a relative path to your local VTube Studio model3.json file.", "warning");
                spinner.classList.add("hidden");
                return;
            }
            preset.url = modelUrl;
            
            // Extract model name from URL/path
            const urlParts = modelUrl.split('/');
            const filename = urlParts[urlParts.length - 1];
            preset.name = filename.replace('.model3.json', '').replace('.model.json', '');
        }

        // Load new model
        currentModel = await PIXI.live2d.Live2DModel.from(modelUrl);
        
        // Mount model
        pixiApp.stage.addChild(currentModel);
        
        // Configure positioning
        resizeModel();

        // Enable Pointer Tracking
        currentModel.trackPointer = true;

        // Click Hit Testing Event
        currentModel.on("hit", (hitAreas) => {
            console.log("Model hit areas clicked:", hitAreas);
            if (hitAreas.includes("head") || hitAreas.includes("Head") || hitAreas.includes("Face") || hitAreas.includes("face")) {
                playMascotReaction("headpat");
            } else if (hitAreas.includes("body") || hitAreas.includes("Body") || hitAreas.includes("chest") || hitAreas.includes("Chest")) {
                playMascotReaction("poke");
            } else {
                playMascotReaction("talk");
            }
        });

        // Add a general canvas click fallback if hit areas aren't configured or hit
        pixiApp.view.onclick = (e) => {
            // Give it a tiny delay to see if hit area triggers first
            setTimeout(() => {
                // If no motion played in last 100ms, trigger random general reaction
                if (Date.now() - lastMotionTime > 150) {
                    playRandomInteraction();
                }
            }, 50);
        };

        writeTerminalLine(`[Live2D] Mascot loaded: ${preset.name}`, "success");
    } catch (e) {
        console.error("Failed to load Live2D Model:", e);
        writeTerminalLine(`[Live2D ERROR] Failed to load ${charKey} model. Ensure path is correct and files are served locally.`, "error");
        
        // Fallback to Haru if custom model fails to load
        if (charKey === 'custom') {
            writeTerminalLine("[Live2D] Falling back to default Haru model...", "info");
            setTimeout(() => {
                mascotSelector.value = 'haru';
                currentMascotKey = 'haru';
                document.getElementById("custom-model-input-wrapper").style.display = 'none';
                localStorage.setItem('antigravity_active_mascot', 'haru');
                loadMascotModel('haru');
            }, 1000);
        }
    } finally {
        spinner.classList.add("hidden");
    }
}

// Resize and position model inside the canvas
function resizeModel() {
    if (!currentModel || !pixiApp) return;

    const preset = MASCOT_PRESETS[currentMascotKey];
    
    // Reset scale to 1 to measure original unscaled height/width
    currentModel.scale.set(1);
    const originalWidth = currentModel.width;
    const originalHeight = currentModel.height;
    
    // Scale model to fit parent canvas height beautifully
    const targetHeight = pixiApp.screen.height * 0.88;
    
    // Apply preset-specific scale multiplier relative to logical screen bounds
    const scaleMultiplier = preset.scaleMultiplier || 1.05;
    const finalScale = (targetHeight / originalHeight) * scaleMultiplier;
    
    currentModel.scale.set(finalScale);

    // Center horizontally and align bottom of model with bottom of canvas
    currentModel.x = (pixiApp.screen.width - currentModel.width) / 2 + (preset.xOffset || 0);
    
    // Align model bottom to canvas bottom, shifted slightly based on preset details
    currentModel.y = pixiApp.screen.height - currentModel.height + (preset.yOffset || 0);
}

// Handle Character Switcher dropdown
const mascotSelector = document.getElementById("mascot-selector");
const customInputWrapper = document.getElementById("custom-model-input-wrapper");
const customLoadBtn = document.getElementById("custom-model-load-btn");
const customPathInput = document.getElementById("custom-model-path");

mascotSelector.addEventListener("change", (e) => {
    currentMascotKey = e.target.value;
    localStorage.setItem('antigravity_active_mascot', currentMascotKey);
    
    if (currentMascotKey === 'custom') {
        customInputWrapper.style.display = 'flex';
        // Auto load saved path if exists
        const savedPath = localStorage.getItem('antigravity_custom_model_path');
        if (savedPath) {
            customPathInput.value = savedPath;
            loadMascotModel('custom');
        } else {
            updateSpeechBubble("Please enter the relative path to your VTube Studio model3.json file and click Load!");
        }
    } else {
        customInputWrapper.style.display = 'none';
        loadMascotModel(currentMascotKey);
        
        const preset = MASCOT_PRESETS[currentMascotKey];
        updateSpeechBubble(`Hi! I'm ${preset.name}! Ready to help you code! Let's get to work!`);
        setMascotStatusText("Cheerful");
    }
});

customLoadBtn.addEventListener("click", () => {
    const path = customPathInput.value.trim();
    if (path) {
        localStorage.setItem('antigravity_custom_model_path', path);
        loadMascotModel('custom');
    } else {
        alert("Please enter a valid relative path!");
    }
});

// Speech bubble updates
function updateSpeechBubble(text) {
    const bubbleText = document.getElementById("mascot-speech-text");
    bubbleText.style.opacity = 0;
    setTimeout(() => {
        bubbleText.innerHTML = text;
        bubbleText.style.opacity = 1;
    }, 150);
}

// Affection and Motivation updates
async function initAffection() {
    try {
        const response = await fetch('/affection');
        if (response.ok) {
            const data = await response.json();
            affectionPoints = data.points;
            affectionLevel = data.level;
            writeTerminalLine(`[SYSTEM] Loaded offline affection profile: Level ${affectionLevel} (${affectionPoints}%)`, "success");
            updateAffectionUI(false);
            return;
        }
    } catch (e) {
        console.log("Server API unavailable, falling back to Local Storage:", e.message);
    }

    // Local Storage fallback
    const saved = localStorage.getItem('antigravity_affection');
    if (saved) {
        try {
            const data = JSON.parse(saved);
            affectionPoints = data.points;
            affectionLevel = data.level;
            writeTerminalLine(`[SYSTEM] Loaded browser affection profile: Level ${affectionLevel} (${affectionPoints}%)`, "info");
        } catch (e) {
            affectionPoints = 30;
            affectionLevel = 1;
        }
    } else {
        affectionPoints = 30;
        affectionLevel = 1;
    }
    updateAffectionUI(false);
}

async function saveAffection() {
    const data = { points: affectionPoints, level: affectionLevel };
    
    // Save to local storage (always works)
    localStorage.setItem('antigravity_affection', JSON.stringify(data));

    // Try to save to server file affection.json
    try {
        await fetch('/affection', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
    } catch (e) {
        console.log("Server offline, could not write affection.json to disk:", e.message);
    }
}

async function boostAffection(pts) {
    if (affectionLevel >= 100 && affectionPoints >= 99) return; // Maxed out

    affectionPoints += pts;
    let didLevelUp = false;

    while (affectionPoints >= 100) {
        if (affectionLevel < 100) {
            affectionLevel += 1;
            affectionPoints -= 100;
            didLevelUp = true;
        } else {
            affectionPoints = 99; // Cap at Level 100, 99%
            break;
        }
    }

    if (didLevelUp) {
        // Trigger Mascot Level Up cheer
        triggerMascotMotion("build_success");
        const preset = MASCOT_PRESETS[currentMascotKey];
        updateSpeechBubble(`Kyaaa! Level Up! Our affection level has reached **Level ${affectionLevel}**! Master, you're the absolute best! (≧▽≦)♡`);
        writeTerminalLine(`[SYSTEM] Level Up! Mascot affection has risen to Level ${affectionLevel}!`, "success");
        setMascotStatusText("Cheerful");
    }

    await saveAffection();
    updateAffectionUI(true);
}

function updateAffectionUI(triggerPulse = false) {
    const bar = document.getElementById("affection-bar");
    const val = document.getElementById("affection-val");
    
    bar.style.width = `${affectionPoints}%`;
    
    let label = "Budding friendship";
    if (affectionLevel >= 80) label = "Moe Dev Overlords";
    else if (affectionLevel >= 50) label = "Inseparable Duo";
    else if (affectionLevel >= 20) label = "Trusty Partners";
    
    val.innerText = `Lvl ${affectionLevel} (${affectionPoints}%) - ${label}`;
    
    if (triggerPulse) {
        const heart = document.querySelector(".heart-icon");
        heart.style.animation = "heartBeat 0.5s 2 ease-in-out";
        setTimeout(() => {
            heart.style.animation = "heartBeat 1.5s infinite ease-in-out";
        }, 1000);
    }
}

function updateMotivationLevel(val) {
    motivationLevel = val;
    document.getElementById("mascot-focus").innerText = `${motivationLevel}%`;
}

// Token Usage Helpers
function addTokens(amount) {
    if (tokenUsage >= maxTokenQuota) return false;

    tokenUsage = Math.min(maxTokenQuota, tokenUsage + amount);
    updateQuotaUI();

    if (tokenUsage >= maxTokenQuota) {
        // Quota fully exhausted!
        triggerMascotMotion("build_error");
        const preset = MASCOT_PRESETS[currentMascotKey];
        updateSpeechBubble(`Wah! Master, we've completely hit our ${maxTokenQuota/1000}K token quota! I can't process any more code... Click my quota bar to refill! ⊙﹏⊙`);
        setMascotStatusText("Sad");
        writeTerminalLine(`[FATAL] Out of tokens. Quota limit of ${maxTokenQuota.toLocaleString()} reached. Request blocked.`, "error");
        return false;
    }
    return true;
}

function updateQuotaUI() {
    const bar = document.getElementById("quota-bar");
    const val = document.getElementById("quota-val");
    const display = document.getElementById("quota-reset-btn");

    const percentage = (tokenUsage / maxTokenQuota) * 100;
    bar.style.width = `${percentage}%`;
    val.innerText = `${(tokenUsage / 1000).toFixed(1)}K / ${maxTokenQuota / 1000}K`;

    if (percentage >= 90) {
        display.classList.add("warning-state");
    } else {
        display.classList.remove("warning-state");
    }
}

function resetTokenQuota() {
    if (tokenUsage < 15000) {
        updateSpeechBubble("Moe Quota is already fresh! We have plenty of gravity power left! ٩(◕‿◕)۶");
        triggerMascotMotion("talk");
        return;
    }

    tokenUsage = 12000; // Reset to initial usage
    updateQuotaUI();
    
    const preset = MASCOT_PRESETS[currentMascotKey];
    updateSpeechBubble(`Moe quota refilled! Master's credit card is magical! Let's code some more! (≧∇≦)ﾉ`);
    triggerMascotMotion("build_success");
    setMascotStatusText("Cheerful");
    writeTerminalLine("[SYSTEM] Reset token usage quota. Resources fully cleared.", "success");
    boostAffection(2);
}

function setMascotStatusText(status) {
    const moodEl = document.getElementById("mascot-mood");
    moodEl.innerText = status;
    
    if (status === "Thinking") {
        moodEl.style.color = "var(--neon-violet)";
    } else if (status === "Sad" || status === "Shocked") {
        moodEl.style.color = "var(--neon-rose)";
    } else if (status === "Working") {
        moodEl.style.color = "var(--neon-cyan)";
    } else {
        moodEl.style.color = "var(--neon-amber)";
    }
}

// Trigger specific model motions
let lastMotionTime = 0;
function triggerMascotMotion(motionKey) {
    if (!currentModel) return;
    
    const preset = MASCOT_PRESETS[currentMascotKey];
    const reaction = preset.reactions[motionKey];
    
    if (reaction) {
        lastMotionTime = Date.now();
        console.log(`Triggering motion: ${reaction.motion}, Expression: ${reaction.exp}`);
        
        // Play motion
        if (reaction.motion) {
            currentModel.motion(reaction.motion);
        } else if (currentMascotKey === 'custom') {
            // For custom models, play a random available motion if not mapped
            playRandomCustomModelMotion();
        }
        
        // Play expression if supported
        if (reaction.exp !== null && typeof currentModel.expression === 'function') {
            currentModel.expression(reaction.exp);
        }
    }
}

function playRandomCustomModelMotion() {
    if (!currentModel || !currentModel.internalModel || !currentModel.internalModel.settings) return;
    
    const motions = currentModel.internalModel.settings.motions;
    if (!motions) return;
    
    const groups = Object.keys(motions);
    if (groups.length === 0) return;
    
    const randomGroup = groups[Math.floor(Math.random() * groups.length)];
    currentModel.motion(randomGroup);
}

// Play mascot reactions (triggered by headpat, poke, coffee, etc.)
function playMascotReaction(reactionKey) {
    const preset = MASCOT_PRESETS[currentMascotKey];
    const reaction = preset.reactions[reactionKey];
    
    if (reaction) {
        updateSpeechBubble(reaction.text);
        triggerMascotMotion(reactionKey);
        
        // Update stats
        if (reactionKey === 'headpat') {
            boostAffection(5);
            setMascotStatusText("Cheerful");
        } else if (reactionKey === 'coffee') {
            updateMotivationLevel(100);
            boostAffection(3);
            setMascotStatusText("Energized");
        } else if (reactionKey === 'poke') {
            setMascotStatusText("Shy");
        } else {
            setMascotStatusText("Normal");
        }
    }
}

function playRandomInteraction() {
    const reactions = ['headpat', 'poke', 'talk'];
    const randomKey = reactions[Math.floor(Math.random() * reactions.length)];
    playMascotReaction(randomKey);
}

// Manual Interaction Panel Buttons
function initMascotInteractionControls() {
    document.getElementById("react-pat").addEventListener("click", () => playMascotReaction("headpat"));
    document.getElementById("react-gift").addEventListener("click", () => playMascotReaction("coffee"));
    document.getElementById("react-poke").addEventListener("click", () => playMascotReaction("poke"));
    document.getElementById("react-talk").addEventListener("click", () => playMascotReaction("talk"));
}

// Chat System Controls
function initChatControls() {
    const chatInput = document.getElementById("chat-input");
    const sendBtn = document.getElementById("chat-send-btn");
    const clearBtn = document.getElementById("clear-chat-btn");

    sendBtn.addEventListener("click", () => handleSendMessage());
    chatInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    });

    clearBtn.addEventListener("click", () => {
        document.getElementById("chat-messages").innerHTML = "";
        writeTerminalLine("[CHAT] Cleared conversation stream.", "info");
    });

    // Populate initial system/welcome chat message
    appendChatBubble("ai", "Hello, Master! I'm Antigravity. I've finished setting up the Moe console coordinates. Feel free to plan tasks or chat with me. Hiyori is excited to help you compile!");
}

function appendChatBubble(sender, text, thought = null, action = null) {
    const messagesContainer = document.getElementById("chat-messages");
    
    const bubble = document.createElement("div");
    bubble.className = `chat-bubble ${sender}`;

    let avatarInitial = sender === 'user' ? 'U' : 'A';
    let senderName = sender === 'user' ? 'Master Developer' : 'Antigravity AI';

    let thoughtHtml = thought ? `
        <div class="thought-block">
            <i data-lucide="brain-circuit"></i>
            <span>${thought}</span>
        </div>
    ` : "";

    let actionHtml = action ? `
        <div class="action-block">
            <div class="action-block-title">
                <i data-lucide="terminal"></i>
                <span>Executing: ${action}</span>
            </div>
        </div>
    ` : "";

    bubble.innerHTML = `
        <div class="avatar">${avatarInitial}</div>
        <div class="bubble-text-wrapper">
            <span class="bubble-sender">${senderName}</span>
            <div class="bubble-body">
                ${thoughtHtml}
                <div class="bubble-text">${formatMarkdown(text)}</div>
                ${actionHtml}
            </div>
        </div>
    `;

    messagesContainer.appendChild(bubble);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    lucide.createIcons();
}

function appendTypingIndicator() {
    const messagesContainer = document.getElementById("chat-messages");
    const indicator = document.createElement("div");
    indicator.className = "typing-indicator";
    indicator.id = "chat-typing-indicator";
    indicator.innerHTML = `
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
    `;
    messagesContainer.appendChild(indicator);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function removeTypingIndicator() {
    const indicator = document.getElementById("chat-typing-indicator");
    if (indicator) indicator.remove();
}

// Send Message handler
function handleSendMessage() {
    if (tokenUsage >= maxTokenQuota) {
        alert("We are out of tokens! Please click the Quota Bar at the top to refill first!");
        return;
    }

    const chatInput = document.getElementById("chat-input");
    const text = chatInput.value.trim();
    if (!text) return;

    chatInput.value = "";
    appendChatBubble("user", text);
    
    addTokens(450); // prompt cost

    // Mascot enters thinking state
    setMascotStatusText("Thinking");
    updateSpeechBubble("Hmmm... Let me review that command in our workspace buffer...");
    triggerMascotMotion("talk");

    appendTypingIndicator();

    // Process AI response with delay
    setTimeout(() => {
        removeTypingIndicator();
        processAiReply(text);
    }, 1500);
}

// Simulated Reply Router
function processAiReply(userInput) {
    const normalizedInput = userInput.toLowerCase();
    
    addTokens(1250); // completion cost
    
    // Find matching keyword response
    let response = AI_RESPONSES.find(res => {
        return res.keywords.some(keyword => normalizedInput.includes(keyword));
    });

    // Fallback to random general response
    if (!response) {
        response = GENERAL_RESPONSES[Math.floor(Math.random() * GENERAL_RESPONSES.length)];
    }

    // Append AI bubble
    appendChatBubble("ai", response.message, response.thought, response.action);

    // Apply response modifiers
    if (response.speech) {
        playMascotReaction(response.speech);
    }
    
    if (response.boostAffection) {
        boostAffection(response.boostAffection);
    }

    if (response.triggerBuild) {
        simulateProjectBuild();
    }

    if (response.triggerError) {
        simulateCompileError();
    }

    if (!response.speech) {
        setMascotStatusText("Cheerful");
    }
}

// Terminal Console Writers
const terminalOutput = document.getElementById("terminal-output");

function writeTerminalLine(text, type = "info") {
    const line = document.createElement("div");
    line.className = `term-line ${type}`;
    
    const timestamp = new Date().toLocaleTimeString();
    
    if (type === "command") {
        line.innerHTML = `<span style="color: var(--neon-violet)">$</span> ${text}`;
    } else {
        line.innerHTML = `<span style="color: var(--text-muted)">[${timestamp}]</span> ${text}`;
    }
    
    terminalOutput.appendChild(line);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

function clearTerminal() {
    terminalOutput.innerHTML = "";
    writeTerminalLine("[SYSTEM] Terminal log buffer flushed.", "info");
}

// Footer buttons and simulations
function initFooterControls() {
    document.getElementById("clear-terminal-btn").addEventListener("click", clearTerminal);
    document.getElementById("term-run-build").addEventListener("click", () => {
        if (!isBuilding) simulateProjectBuild();
    });
    document.getElementById("term-run-test").addEventListener("click", () => {
        if (!isBuilding) simulateProjectTests();
    });
    document.getElementById("term-trigger-err").addEventListener("click", () => {
        if (!isBuilding) simulateCompileError();
    });
    document.getElementById("theme-toggle").addEventListener("click", toggleTheme);
}

// Build Simulation
async function simulateProjectBuild() {
    if (tokenUsage >= maxTokenQuota) {
        alert("We are out of tokens! Please click the Quota Bar in the header to refill first.");
        return;
    }
    
    isBuilding = true;
    setMascotStatusText("Working");
    updateMotivationLevel(100);
    
    addTokens(2200); // build cost
    
    triggerMascotMotion("build_start");
    updateSpeechBubble("Build sequence started! Keep an eye on the output modules, Master!");

    writeTerminalLine("npm run build --minify=esbuild", "command");
    writeTerminalLine("[VITE] Building bundle for production...", "info");
    await delay(600);
    writeTerminalLine("[VITE] Transform index.html index.js index.css modules", "info");
    await delay(800);
    writeTerminalLine("[STDOUT] Bundling finished: assets/index-g78f.js (24.8 KB)", "info");
    writeTerminalLine("[STDOUT] Bundling finished: assets/index-f8fa.css (12.4 KB)", "info");
    await delay(500);
    
    // Complete build successfully
    writeTerminalLine("[SUCCESS] Build completed in 1.9s. 0 errors, 0 warnings.", "success");
    
    triggerMascotMotion("build_success");
    updateSpeechBubble("Ta-da! The build compiled successfully, Master! I'm so proud of us! ♡");
    setMascotStatusText("Cheerful");
    
    boostAffection(4);
    isBuilding = false;
}

// Test Simulation
async function simulateProjectTests() {
    if (tokenUsage >= maxTokenQuota) {
        alert("We are out of tokens! Please click the Quota Bar in the header to refill first.");
        return;
    }
    
    isBuilding = true;
    setMascotStatusText("Working");
    
    addTokens(1800); // test cost
    
    writeTerminalLine("npm run test --coverage", "command");
    writeTerminalLine("[VITEST] Running test modules...", "info");
    await delay(600);
    writeTerminalLine("[VITEST] PASS  components/Live2DModel.test.js (12 tests)", "success");
    await delay(600);
    writeTerminalLine("[VITEST] PASS  controllers/Conversation.test.js (5 tests)", "success");
    await delay(400);
    writeTerminalLine("[VITEST] PASS  utils/gravityCoord.test.js (8 tests)", "success");
    await delay(400);
    
    // Coverage report
    writeTerminalLine("------------------------------------------", "info");
    writeTerminalLine("File          | % Stmts | % Branch | % Funcs |", "info");
    writeTerminalLine("All files     |   94.2% |    88.5% |   96.8% |", "info");
    writeTerminalLine("------------------------------------------", "info");
    
    writeTerminalLine("[SUCCESS] All 25 unit tests passed! Coverage: 94.2%", "success");
    
    triggerMascotMotion("build_success");
    updateSpeechBubble("Awesome! 100% test pass rate! All our code files are working flawlessly! (๑•̀ㅂ•́)و✧");
    setMascotStatusText("Cheerful");
    
    boostAffection(5);
    isBuilding = false;
}

// Error Simulation
async function simulateCompileError() {
    if (tokenUsage >= maxTokenQuota) {
        alert("We are out of tokens! Please click the Quota Bar in the header to refill first.");
        return;
    }
    
    isBuilding = true;
    setMascotStatusText("Shocked");
    
    addTokens(1000); // error cost
    
    triggerMascotMotion("build_error");
    updateSpeechBubble("Eeeek! A syntax error! The compiler crashed! Oh no...");

    writeTerminalLine("npm run build", "command");
    writeTerminalLine("[VITE] Building bundle for production...", "info");
    await delay(600);
    writeTerminalLine("[STDOUT] Processing layout nodes...", "info");
    await delay(400);
    
    // Red error outputs
    writeTerminalLine("[ERROR] Compile failure in index.js: Line 142", "error");
    writeTerminalLine("        SyntaxError: Unexpected token '}' (missing closing bracket)", "error");
    writeTerminalLine("        at Module.compile (node:internal/modules/cjs/loader:1105:14)", "error");
    writeTerminalLine("[FATAL] Re-bundle process terminated. Code 1.", "error");

    writeTerminalLine("Build failed. Fix the code to restore stability.", "warning");
    
    setMascotStatusText("Sad");
    isBuilding = false;
}

// Theme toggler
function toggleTheme() {
    const currentTheme = document.body.getAttribute("data-theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";
    document.body.setAttribute("data-theme", newTheme);
    
    writeTerminalLine(`[SYSTEM] Switched visual theme to: ${newTheme.toUpperCase()}`, "info");
    
    const preset = MASCOT_PRESETS[currentMascotKey];
    updateSpeechBubble(`Swapped the gravity filters! Do you like my ${newTheme} colors, Master?`);
    triggerMascotMotion("talk");
}

// Helpers
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function formatMarkdown(text) {
    // Simple mock markdown formatting: bullet points and strong text
    return text
        .replace(/\n/g, '<br>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>')
        .replace(/^\d+\.\s(.*)/gm, '<li>$1</li>');
}
