---
title: Creating and adding custom HUD widgets
tags:
  - lui
  - ui
  - lua
section: lui
description: "Creating and adding custom HUD widgets."
discord:
  enabled: true
  forum: tutorials
  tags:
    - blackops3
    - lui
---

# Creating and adding custom HUD widgets

---

This guide introduces the basic setup and workflow for creating and adding custom HUD widgets.

---

## Elements vs Widgets

When working with the UI system, it is important to understand the difference between an **element** and a **widget**, as these terms are used frequently throughout CoD Lua UI.

## What is an Element?

An element is a single UI object that is responsible for displaying or managing one specific part of the interface.

Some common examples include:

```lua
UIElement
UIText
UIImage
UIList
```

Each element type serves a particular purpose:

* **UIElement** - A generic container used for positioning, sizing, animation, and grouping.
* **UIText** - Displays text on-screen.
* **UIImage** - Displays images on-screen.
* **UIList** - Displays a collection of items using a widget as its row template.

Think of elements as the individual pieces that make up a UI. On their own, they usually perform a single task, such as displaying text or an image.

For example, an image element:

```lua
self.MyElement = LUI.UIImage.new()
self.MyElement:setLeftRight( true, false, 0, 100 )
self.MyElement:setTopBottom( true, false, 0, 100 )
self.MyElement:setImage( RegisterImage( "$white" ) )
self:addElement( self.MyElement )
```

---

## What is a Widget?

A widget is a Lua file that groups one or more elements together into a reusable UI component.

Widgets are defined through a function:

```lua
CoD.MyWidget.new = function ( menu, controller )
```

Inside this function, elements are created, configured, and added to the widget before it is returned.

A simple widget might contain:

```text
MyWidget
├── Background Image
├── Title Text
└── Description Text
```

While each item above is an individual element, the entire collection forms a widget.

You can think of a widget as a container that combines multiple elements into a single unit with a specific purpose.

---

## Widgets Can Contain Other Widgets

Widgets are not limited to containing only elements. A widget can also contain other widgets.

This is extremely common and helps keep UI code organized.

For example:

```text
PlayerCardWidget
├── Background Image
├── Name Text
├── Rank Icon
└── StatsWidget
    ├── Kills Text
    ├── Deaths Text
    └── Score Text
```

In this example:

* `Background Image`, `Name Text`, and `Rank Icon` are elements.
* `StatsWidget` is a child widget.
* `PlayerCardWidget` is the parent widget.

The child widget may itself contain additional elements and even more child widgets.

This hierarchical structure allows complex interfaces to be broken down into smaller, easier-to-manage components.

---

## Why Use Child Widgets?

As a UI grows in complexity, placing every element inside a single file quickly becomes difficult to maintain.

Instead, related elements are often grouped into their own widgets.

For example, rather than creating:

```text
PlayerCard
├── 20+ Elements
```

you might create:

```text
PlayerCard
├── HeaderWidget
├── StatsWidget
├── ProgressBarWidget
└── EmblemWidget
```

Each widget is responsible for a specific part of the interface, making the code easier to read, debug, and reuse elsewhere.

---

## Creating a clean workspace for HUD editing

Before we begin creating and adding custom HUD widgets, here’s a useful tip: start with a clean, blank canvas.

You can temporarily remove all existing HUD elements from view without deleting them. This makes it easier to design and position new components while keeping everything intact in the background. This only requires a simple one-line change.

To do this, locate each widget inside your main HUD file (`T7Hud_zm_factory.lua`)-the same file you renamed in the previous step.

A typical widget will look like this:

```lua
self.ZMPerksContainerFactory = CoD.ZMPerksContainerFactory.new( self, controller )
self.ZMPerksContainerFactory:setLeftRight( true, false, 130, 281 )
self.ZMPerksContainerFactory:setTopBottom( false, true, -62, -26 )
self:addElement( self.ZMPerksContainerFactory )
```

To hide it, simply comment out the `addElement` line. In Lua, comments are created using `--`, so it becomes:

```lua
--self:addElement( self.ZMPerksContainerFactory )
```

> **Note:** If you don’t plan on keeping certain widgets, you should remove them entirely. However, commenting out `addElement` is especially useful when you only need a temporary clean canvas for layout work, since it avoids permanent changes and keeps all references intact.

This is especially important in a full HUD setup, where many widgets control different systems such as the scoreboard, challenge notifications, max ammo indicators, and other core gameplay UI elements. Because of this, you should be careful about permanently removing anything unless you’re intentionally refactoring or replacing that system.

Fully removing a widget would normally require updating multiple parts of the file, including its `require()` statement, the widget definition in the main function body, and the corresponding `:close()` call inside `LUI.OverrideFunction`.

> **Tip:** It’s recommended to comment out the `addElement` lines for core HUD elements such as perks, rounds, ammo, and score widgets.

After that, you’ll have a clean canvas ready to start building your own custom HUD elements.

---

## Creating a New Widget

Creating a new widget involves a few steps before it can be displayed in-game.

At a high level, you will need to:

* Create a new Lua file for the widget.
* Package the file with your map by adding it to your zone file.
* Load the widget using require() before attempting to create or reference it from another Lua file.

### 1. Create the Widget File

Start by creating a new Lua file for your widget, an example widget template is available below:

<a class="download-button" href="/assets/files/lui/MyWidget.lua" download>New Widget Template</a>

The template contains the basic structure required for a functioning widget, along with a simple example image element.

It is intended to serve as a starting point for your own UI components.

This file will contain all of the code responsible for creating and configuring your widget.

---

When using the template widget provided in this guide, you will also need to rename it to match your own widget.

Inside the file, there are multiple references to the widget’s name (4 in total), all using the placeholder `MyWidget`. These all need to be updated so they match your new widget name.

For example, if you are creating an ammo container, you might rename all instances of:

```lua
MyWidget
```

to something like:

```lua
ExampleAmmoContainer
```

It is important that all references inside the file use the same name. If one is left unchanged, the widget will not load correctly.

### 2. Add the Widget to Your Zone File

Like any other Lua file, the widget must be included in your map's zone file so that it is packaged into the mod and available at runtime.

If the file is not added to the zone file, the game will be unable to load it.

For example:
```text
rawfile,ui/uieditor/widgets/HUD/ZM_Asylum_AmmoWidget/ZM_Asylum_AmmoContainer.lua
```

### 3. Require the Widget

Before a widget can be used, it must be loaded with `require()`.

For example:

```lua
require( "ui.uieditor.widgets.HUD.ZM_Asylum_AmmoWidget.ZM_Asylum_AmmoContainer" )
```

> **Note:** The `require()` call ensures that the widget file is loaded and executed before it is used. As a general convention, widgets should be required in the file that directly references them rather than in a shared or unrelated file. This keeps dependencies explicit, makes the codebase easier to navigate, and helps maintain a modular UI structure.

### 4. Define the Widget

Inside the widget file, you will find the root `LUI.UIElement`.

The root element acts as the container for everything else that will be added to the widget.

From there, you can begin creating and adding child elements such as:

* Images
* Text
* Lists

Once configured, the root element is returned and can be added to a menu, HUD, or another widget.

The template widget provided in this guide already includes a simple example element so you can see how everything fits together in practice.

In this case, the block below defines a single UI image element.

```lua
self.MyElement = LUI.UIImage.new()
self.MyElement:setLeftRight( true, false, 0, 100 )
self.MyElement:setTopBottom( true, false, 0, 100 )
self.MyElement:setImage( RegisterImage( "$white" ) )
self:addElement( self.MyElement )
```

This is what a basic element looks like inside a widget.

Let’s break down what you’re seeing:

* `self.MyElement` → This is just a variable that stores the element so it can be referenced later.
* `LUI.UIImage.new()` → This creates a new image element.
* `setLeftRight()` / `setTopBottom()` → These control the element’s position and size on screen.
* `setImage()` → This assigns the image that will be displayed.
* `addElement()` → This attaches the element to the widget so it actually appears in the UI.

---

## Replacing Widgets in the main HUD file

This shortcut only applies to the **main HUD file**. Many stock HUD components, such as ammo, score, rounds, and perks, are already instantiated and added to the HUD. Because of this, you can often replace the existing widget rather than creating a new setup block and `:close()` call from scratch.

When creating your own widgets or adding widgets to other widgets, this convenience does not exist—you'll need to create and manage those references yourself.

For example, the stock ammo widget is added to the HUD using the following block:

```lua
self.Ammo = CoD.ZmAmmoContainerFactory.new( self, controller )
self.Ammo:setLeftRight( false, true, -427, 3 )
self.Ammo:setTopBottom( false, true, -232, 0 )
self:addElement( self.Ammo )
```

If you created your custom widget using the template provided earlier in this guide, its constructor function will be named:

```lua
CoD.MyWidget.new
```

After adding a `require()` statement for your widget, you can simply replace the constructor being called by the existing HUD block.

Change this:

```lua
self.Ammo = CoD.ZmAmmoContainerFactory.new( self, controller )
```

to this:

```lua
self.Ammo = CoD.MyWidget.new( self, controller )
```

The completed block would then look like:

```lua
self.Ammo = CoD.MyWidget.new( self, controller )
self.Ammo:setLeftRight( false, true, -427, 3 )
self.Ammo:setTopBottom( false, true, -232, 0 )
self:addElement( self.Ammo )
```

Notice that only the constructor has changed:

```lua
CoD.ZmAmmoContainerFactory.new
```

became:

```lua
CoD.MyWidget.new
```

Everything else remains exactly the same.

Because the widget is still being stored in `self.Ammo`, the existing `:close()` call at the bottom of the file will continue to work correctly. There is no need to create a new setup block or add a new `:close()` call when replacing an existing HUD widget in this way.

This is often the quickest way to replace stock HUD components, as most of the required setup already exists in the main HUD file.

---

## Adding the widget to your HUD

Now, to add the widget to your HUD, you’ll need to do a couple of things.

> **Note:** This section applies when you are adding a completely new widget to the HUD.
> If you are replacing an existing HUD component (such as ammo, score, rounds, or perks), that process was covered in the previous section and you do not need to follow these steps, since the widget reference and cleanup logic already exist.

You should already have:

* packaged the file with your map by adding it to your map's zone file
* added the `require()` line for it in the file where it will be used

The process is the same whether you're working in a menu, or another widget. The only thing that changes is what you pass as the first argument, which determines the parent UI element the widget is attached to.

For example, The only difference between these two examples is the first argument passed into the widget:

These are the actual blocks of code you add to the file to create, position, and add your widget to the UI:

```lua
self.ZMPerksContainerFactory = CoD.ZMPerksContainerFactory.new( self, controller )
self.ZMPerksContainerFactory:setLeftRight( true, false, 130, 281 )
self.ZMPerksContainerFactory:setTopBottom( false, true, -62, -26 )
self:addElement( self.ZMPerksContainerFactory )
```

```lua
self.MyWidget = CoD.MyWidget.new( menu, controller )
self.MyWidget:setLeftRight( true, true, 0, 0 )
self.MyWidget:setTopBottom( true, true, 0, 0 )
self:addElement( self.MyWidget )
```

Both `self` and `menu` represent the **parent UI element** that the widget is being added into.

When adding widgets to a menu, the first argument is typically `self`, whereas inside a widget the parent UI is passed in as `menu`.

This block of code is added between the initial UI setup section and the closing section of the file.

The initial UI setup section is a block of code at the start of the file and typically looks something like this:

```lua
self:setUseStencil( false )
self:setClass( CoD.MyWidget )
self.id = "MyWidget"
self.soundSet = "default"
self:setLeftRight( true, false, 0, 1280 )
self:setTopBottom( true, false, 0, 720 )
self.anyChildUsesUpdateState = true
```

Everything after this point is where UI elements and widgets are created and added.

Everything before the final cleanup section (`LUI.OverrideFunction`) is valid space for widget definitions.

---

### After adding your widget

Once you’ve added your widget block, you also need to make sure it is properly cleaned up when the UI is closed:

```lua
LUI.OverrideFunction_CallOriginalSecond( self, "close", function ( element )
    element.MyWidget:close()
end )
```

This is done using the existing `LUI.OverrideFunction` at the bottom of the file.


> **Note:** You do not need to create this function - it already exists. You only need to add your widget’s cleanup call inside it.

---

## What’s Next

Now that you understand how widgets are structured and how elements are added to them, the next step is learning how **positioning actually works** in the UI system.

In the next section, we’ll go over this so that you can form an understanding of how to move and arrange UI elements on screen.

---

> **Next step: [Lua UI positioning](/docs/lui/positioning)**