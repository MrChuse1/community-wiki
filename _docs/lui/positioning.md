---
title: LUI Positioning
tags:
  - lui
  - ui
  - positioning
  - lua
section: lui
description: "Understand setLeftRight and setTopBottom anchors, offsets, and parent-relative widget placement."
discord:
  enabled: true
  forum: tutorials
  tags:
    - blackops3
    - lui
---

# LUI Positioning

LUI widgets are positioned relative to their parent. The two calls you will use most often are `setLeftRight` for horizontal placement and `setTopBottom` for vertical placement. Both calls describe two anchor points and two offsets.

For `setLeftRight(leftAnchor, rightAnchor, leftOffset, rightOffset)`, LUI first finds the left and right anchor points inside the parent, then applies the offsets:

```text
Left[Widget]  = Left[Parent] + (Width[Parent] * leftAnchor) + leftOffset
Right[Widget] = Left[Parent] + (Width[Parent] * rightAnchor) + rightOffset
Width[Widget] = Right[Widget] - Left[Widget]
```

`setTopBottom` works the same way vertically, using the parent's top, height, and bottom offsets.

When there is no parent, the UI root is treated as a `1280 x 720` viewport:

```text
Left[Root] = 0
Right[Root] = 1280
Top[Root] = 0
Bottom[Root] = 720
```

## Boolean Anchors

In most practical LUI code, the first two values are booleans. LUI maps those booleans into numeric anchor positions:

| Input pair | Numeric anchors | Meaning |
| --- | --- | --- |
| `(true, false)` | `(0.0, 0.0)` | Anchor both offsets to the left or top edge. |
| `(false, true)` | `(1.0, 1.0)` | Anchor both offsets to the right or bottom edge. |
| `(false, false)` | `(0.5, 0.5)` | Anchor both offsets to the center. |
| `(true, true)` | `(0.0, 1.0)` | Anchor one offset to each side of the parent. |

Offsets can be positive or negative. A positive horizontal offset moves to the right of the anchor point, and a negative horizontal offset moves to the left. Vertically, positive offsets move down from the anchor point, and negative offsets move up.

## Interactive Demo

Use the presets to step through the examples, or change the parent and child values directly. The root box represents the `1280 x 720` UI root, the amber box is the parent widget, and the blue box is the child widget being calculated. Switch either axis to Custom to pass numeric anchor values instead of the usual boolean shorthand.

{% include demos/lui-positioning.html %}

## Examples

These are the common horizontal anchor patterns:

- `setLeftRight(true, false, 12, 48)` anchors the child to the parent's left edge. The child starts 12 units from the left edge and is 36 units wide.
- `setLeftRight(false, true, -60, -30)` anchors the child to the parent's right edge. The child starts 60 units left of the right edge and is 30 units wide.
- `setLeftRight(false, false, -15, 15)` anchors the child to the parent's center. The child is 30 units wide and centered.
- `setLeftRight(true, true, 0, 0)` stretches the child to the same width as the parent.
- `setLeftRight(true, true, 2, -2)` stretches the child across the parent with a 2 unit margin on each side.
- `setLeftRight(false, false, -20, 10)` anchors the child to the center, makes it 30 units wide, and shifts it 5 units left of center.

The important thing to remember is that the offsets do not describe width directly. They describe two final edges, and width is the distance between those edges.
