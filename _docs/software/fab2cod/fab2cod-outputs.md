---
title: Outputs
tags: 
  - blackops3
  - radiant
  - ape
  - assets
  - converter
---
# Assets
When you convert a model, it will place it will create its own folder inside the Fab directory in your Black Ops III root. If you try to convert the a model that is already in the directory, it will skip it. So make sure your models have unique names. 

If the model is from Fab, the LOD suffix will be stripped from the name.

## Meshes
When you drag a USDZ model, the meshes will be converted to a single `xmodel_bin` file.

## Materials and Textures
Any materials used on the meshes will be converted to Black Ops III properties. Each map will prioritise an input texture but if one is not assigned, it will use the value.

### PBR Materials
Metallic materials will be converted into will be converted into Specular and change the Geometry type is changed to Geometry Advanced. 
If no metallic value is present, the material remains as Geometry Plus.

Texture names will be overridden to copy the Treyarch naming scheme.
{% include alert.html title="Example" type="info" content="The base colour texture for a model called `chair_01` and a material called `chair_wood` would be called `i_mtl_fab_chair_01_chair_wood_n.png`" %}

## Levels of Detail
When using Fab models, you can drag multiple LODs onto the converter and it will asign them as LODs inside an xmesh asset. 

It is recommended to only use `_low`, `_medium`, and `_high`. Do not use `_raw` because it is not optimised for gameplay and will be computationally heavy.

Textures from the highest LOD will be used. 