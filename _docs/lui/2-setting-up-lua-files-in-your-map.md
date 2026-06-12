---
title: Setting up Lua files in your map
tags:
  - lui
  - ui
  - lua
section: lui
description: "Setting up Lua files in your map."
discord:
  enabled: true
  forum: tutorials
  tags:
    - blackops3
    - lui
---

# Setting up Lua files in your map

---

> **Note:** Before continuing, make sure you have completed the previous section:
> [Getting Started with UI Development](/docs/lui/1-getting-started-with-ui-development)

This ensures that all required tools and files are installed and ready to use.

---

## Organising UI Files

To begin, you will need to integrate the `T7Hud_zm_factory.lua` file you downloaded earlier into your map project.

This file serves as the base HUD for *The Giant*, which is used as the foundation for custom Zombies maps. Since custom maps inherit assets from The Giant, overriding its HUD allows us to implement a fully custom interface.

---

### Setting up the folder structure

Navigate to your map directory (the folder containing `scripts`, `zone_source`, and other project files).

Inside this directory, create a new folder named: `ui`

---

> **Important:** The location of the Lua file within the `ui` folder does not matter. However, the file path must not match the original path.
>
> If the path matches the original, the game will prioritise the stock file, and your custom HUD file will not be loaded.
>
> The original HUD file is located at:
> `ui/uieditor/menus/hud/T7Hud_zm_factory.lua`
>
> To avoid conflicts, ensure your version differs in either directory structure or filename. For example:
> `ui/uieditor/menus/hud/T7Hud_zm_factory_1.lua` is acceptable.
>
> It is important to note that the goal is **not** to replace or override the original HUD file itself. Instead, your custom file defines the same menu creation function:
>
> ```lua
> LUI.createMenu.T7Hud_zm_factory = function ( controller )
> ```
>
> When your custom file is loaded by the game, this function definition overrides the existing one in memory. As a result, when the game requests `T7Hud_zm_factory`, it executes your version of the function and loads your custom HUD instead of the default HUD. The original file remains unchanged; only the function implementation is replaced at runtime.

---

> **Tip:** Keeping your Lua files well organised is strongly recommended. A full HUD system can quickly grow into many files, and maintaining a clear structure will make development significantly easier.

---

### Example folder structure

For reference, here is an example of a clean and scalable UI structure:

```
ui/uieditor/menus/hud/T7Hud_zm_asylum.lua
ui/uieditor/widgets/HUD/ZM_Asylum_AmmoWidget/ZM_Asylum_AmmoContainer.lua
ui/uieditor/widgets/HUD/ZM_Asylum_ScoreWidget/ZM_Asylum_ScoreContainer.lua
```

---

Once your `ui` folder is set up and the `T7Hud_zm_factory.lua` file has been placed in your chosen path, you are ready to load the Lua file into your map.

---

## Loading the Lua file into your map

With your UI folder configured and your HUD Lua file in place, the next step is to load it into your map.

---

### Loading the Lua file

Navigate to your map's `scripts` folder and open your map-specific CSC script. For example:

```c
zm_asylum.csc
```

Inside `function main()`, add a `luiload()` call before the line:

```c
zm_usermap::main();
```

For example:

```c
luiload( "ui.uieditor.menus.hud.T7Hud_zm_asylum" );
```

Replace the path above with the path to your own HUD Lua file. This tells the game to load your custom Lua file when the map starts.

---

### Adding the Lua file to the zone file

Loading the file is not enough on its own. The Lua file must also be included in your map's zone file so that it is packaged into the map during compilation.

Open your map's zone file and add the following line:

```text
rawfile,ui/uieditor/menus/hud/T7Hud_zm_asylum.lua
```

As before, replace the path with the location of your own Lua file.

---

> **Note:** Once both steps are complete, your custom HUD Lua file will be loaded when the map starts. You are now ready to begin creating and adding custom HUD widgets.

---

> **Next step: Creating and adding custom HUD widgets**