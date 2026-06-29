---
title: Using Fab2Cod
tags: 
  - blackops3
  - radiant
  - ape
  - assets
  - converter
---
## Introduction
Fab2Cod allows you to quickly convert USDZ files to `xmodel_bin` files along with textures. All assets from a model, including mesh, materials, and textures, will be setup in a gdt file in the same directory.

## Options and Flags

Bake Transforms: Some meshes may have been rotated into position and so this option bakes the rotation and inherited transforms into the meshes themselves so that they have the correct orientation in APE. It is recommend to keep this on.

## Drag and Drop
You can drag and drop files either in the box inside the window or onto the exe itself. When dragged onto the exe, the tool will use the settings provided in the config file or overridden with flags.