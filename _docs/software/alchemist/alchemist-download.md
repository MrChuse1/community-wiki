---
title: Download Alchemist
tags: 
  - alchemist
  - software
  - animation
  - converter
  - weapons
authors: 
  - Scobalula
section: software
description: "This page provides a download for Alchemist and previous version history."
---

# Download Alchemist

---

The latest version of Alchemist can be downloaded below, along with previous versions:
- [Download Alchemist](https://mega.nz/folder/oj4ymQza#lPdy--geSRC40qWv800HqA)

---

# Version History

---

## Alchemist UI 0.0.0.9 Alpha Update:

* Fixed issue with Cast files > 255 frames due to byte values being written for rotation key frames

## Alchemist UI 0.0.0.8 Alpha Update:

* Large refactoring to backend animation code in RedFox to improve scalability and addition of features. Please do keep an eye out for any issues but pretty sure this is working same as old version.
* Further improved Cast support and removed ability to save to SEAnim (you can still load SEAnim, but with refactoring it's not viable to continue supporting writing to SEAnim)
* Fixed copying animations not working
* Added "Output" to end of default animation folder
* Added ability to drag and drop project files onto Alchemist's exe
* Added experimental offset feature, can do negative values to indicate offsetting from end of animations
* Probably some other stuff in there tbh

## Alchemist UI 0.0.0.7 Alpha Update:

* Added alpha support for Cast, this is very early implementation but should currently support loading enough info to load anim/skeletons and export anims that work in Blender/Maya, your feedback is appreciated to help further improve this as the code will eventually go into my other apps/libraries such as Tyrant, etc.
* Removed Skeleton entry and replaced with Parts, so now the idea is you add your "parts" to the list as seen below, such as viewhands, receiver, barrel, etc. Order is important and ensuring those further down the list can connect, you need to ensure a child part's parent is there or else they'll end up at zero!
* Added new option "Match old Call of Duty Games", old CoD games used to zero out the viewmodel transforms, semodel/seanim had features for this, and Cast has overrides, but honestly trying to match them up is not feasable, so this toggle allows Alchemist to just handle it same as old games did it, this shouldn't be needed for IW8+

## Alchemist UI 0.0.0.6 Alpha Update:

* Added experimental scripts feature, for now it contains Generate Sprint Anim script, which generates in/loop/out for sprint, super sprint, and slides, in the future you will be able to make your own scripts. https://i.imgur.com/aKuY3gH.gif
* Added Analytics to generate data on Alchemist usage, you will be shown a dialog that displays info and opt in/out, no personal data is logged and you can check the log file for everytime analytics is pushed, only date and actions are pushed, and it's all in one big table in Supabase. https://i.imgur.com/PeKx3sg.png

## Alchemist UI 0.0.0.5 Alpha Update:

* Alpha support for bone overrides in animations

## Alchemist UI 0.0.0.4 Alpha Update:

* Fixed Delete Layer button tooltip 
* Added keybind CTRL+SHIFT+Q to attempt to best-fit UI columns to current window width 
* Added Left/Right Hand IK Target Overrides (Alchemist will use global IK settings unless override is set)
* Added logging

## Alchemist UI 0.0.0.3 Alpha Update:

* Fixed global settings not correctly updating in UI when a project was loaded (they would apply, but wouldn't show as updated)
* Added Delete Button to layers 
* Added keybind to delete selected animations on pressing Delete 

## Alchemist UI 0.0.0.2 Alpha Update:

* Project file now holds all settings
* Added shortcuts to Save/Save (CTRL+S or CTRL+SHIFT+S)
* Added ability to copy/paste animations (CTRL+C and CTRL+V)
* Added buttons for loading, saving, and saving as current project
* Added option for output format to prepare for newer formats
* Added option to set global prefix/suffix
* Updated titlebar with current loaded project and version
* Added failsafe on crash to attempt save current project to Backup.aprj
* Added example projects

## Alchemist UI 0.0.0.1-NotetrackHotfix Alpha Update:

* Apply notetracks to output animations

## Alchemist UI 0.0.0.1 Alpha Update:

* Initial Release