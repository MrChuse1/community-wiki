---
title: Painting Volume Decals
tutorial_landing: true
tutorial_banner:
  image: /assets/img/mapping/painting-volume-decals/page-01-image-01.png
  alt: Volume decal example
  caption: Painting volume decals helps blend detail into the environment.
tags:
  - blackops3
  - mapping
  - radiant
  - decals
authors:
  - ThrowingMold
section: mapping
description: "Paint volume decals in Radiant for better material blending."
discord:
  enabled: true
  forum: tutorials
  tags:
    - blackops3
    - mapping
    - decals
---

# Painting Volume Decals

*Mod Tools: Theory and Practice*

*ThrowingMold*

## INTRODUCTION

Many people know that you can use a volume decal in their maps to add extra detail around, though some don't know that you can paint on them like terrain patches.

![Example area with mixed textures and models](/assets/img/mapping/painting-volume-decals/page-02-image-01.png)

Consider the following, you have an area in your map with a mix of textures and models and the models aren't blending in with the environment.

As you can see in this example image, the wood panel isn't blending into the snow that is around and on top of it.

Most people would add a volume decal on top of them to try and blend it. But even then, if you can adjust the feather on the decal. But this doesn't give you full control of the decal and how visible parts of the texture are.

![Volume decal blending example](/assets/img/mapping/painting-volume-decals/page-02-image-02.png)

## revealDataSize

This setting, found in your Entity Info when selecting the decal, allows you to enable paintable vertices. There are 4 options to choose from: revealAll, 4x4, 8x8, and 16x16.

![Entity Info revealDataSize setting](/assets/img/mapping/painting-volume-decals/page-03-image-01.png)

Depending on which setting you choose will give you more verts to paint on.

I recommend this rule of thumb: The smaller the decal, the less verts you need to have.

It is mandatory that your decal texture is a variant of a decal_reveal. You can find these by searching for "all reveal decal" in the material type of the Textures panel.

![Texture panel material type search](/assets/img/mapping/painting-volume-decals/page-03-image-02.png)

Now that you have the right settings and texture, you can go into the Advanced Patch Editing Options and paint your decal.

![Advanced Patch Editing Options painting example](/assets/img/mapping/painting-volume-decals/page-03-image-03.png)

## Key Take Aways

- revealDataSize
- Decal_reveal
- Advanced Patch Editing Options

![Final painted volume decal example](/assets/img/mapping/painting-volume-decals/page-04-image-01.png)

## Resources

[Open the original Painting Volume Decals PDF](/assets/files/painting-volume-decals.pdf)
