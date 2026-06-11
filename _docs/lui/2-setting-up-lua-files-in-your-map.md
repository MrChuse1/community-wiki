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

> **Important:** The location of the Lua file within the `ui` folder does not matter. However, the file path must not match the original game path.
>
> If the path matches the original, the game will prioritise the stock file, and your custom HUD will not load.
>
> The original path of the HUD file is:
> `ui/uieditor/menus/hud/T7Hud_zm_factory.lua`
>
> To avoid conflicts, ensure your version differs in either directory structure or filename. For example:
> `ui/uieditor/menus/hud/T7Hud_zm_factory1.lua` is acceptable.

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

Once your `ui` folder is set up and the `T7Hud_zm_factory.lua` file has been placed correctly, you are ready to proceed to the next step: loading the Lua file into your map.