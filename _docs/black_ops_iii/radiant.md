---
title: Radiant
tutorial_landing: true
tutorial_banner:
  image: /assets/img/radiant_loading.jpeg
  alt: Radiant
  caption: Radiant window.
tags:
  - blackops3
  - radiant
  - mapping
authors:
  - MrChuse
section: black_ops_iii
description: "Radiant level editor"
discord:
  enabled: true
  forum: tutorials
  tags:
    - blackops3
    - assets
---
# Radiant

---

## Introduction

Radiant is the Level Editor used in Call of Duty titles. It allows modders to design and build 3D environments for custom maps for Black Ops III Mod Tools.

## Main Interface

#### Viewport Windows
| Viewport         | Direction            | Purpose                         |
| ---------------- | -------------------- | ------------------------------- |
| Top View         | Looking Down (Z+)    | Planning layout, room placement |
| Front View       | Looking forward (Y+) | Elevation, height adjustments   |
| Side View        | Looking right (X+)   | Depth, corridor design          |
| Perspective View | 3D perspective       | Final visualization, navigation |


**Viewport**|**Direction**|**Purpose**
:-----:|:-----:|:-----:
Top View         | Looking Down (Z+)    | Planning layout, room placement
Front View       | Looking forward (Y+) | Elevation, height adjustments
Side View        | Looking right (X+)   | Depth, corridor design
Perspective View | 3D perspective       | Final visualization, navigation

#### Entity Info
- Lists all properties of the selected enity.
- Shows entity type.
- Allows adding custom property values.

#### Entity Browser
- Browse all entities registered in [APE](/docs/black_ops_iii/ape).

#### Prefab Browser
- Browse all default or custom prefabs.
- Any prefabs created in the viewport will appear here.
{% include alert.html type="primary" title="Note" content="Prefabs are `.map` files containing a bundle of map entities. This is used to group assets in an area for copying or moving in/or across maps." %}
