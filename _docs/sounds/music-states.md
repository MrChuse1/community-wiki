---
title: Using Music States
tags:
  - blackops3
  - audio
  - music
  - aliases
  - scripting
authors:
  - Blak
  - Scobalula
section: sounds
description: "Set up .mus files, aliases, and script calls for Black Ops III music states."
discord:
  enabled: true
  forum: tutorials
  tags:
    - blackops3
    - audio
    - music
---

# Using Music States

## Introduction

Music states allow you to trigger named music entries from script, including round sounds, special tracks, game over music, and other priority-based playback. This guide walks through setting up a `.mus` file, preparing aliases, registering music states, and playing those states in-game.

{% include alert.html title="Note" type="info" content="This guide focuses on Black Ops III Zombies music states. Existing game files can be useful references, but use files from your own installation or project resources." %}

## Setting up a .mus file

To use the music system, create a `.mus` file in:

```text
Call of Duty/share/raw/sound/music
```

The Mod Tools do not provide a clean example file by default, so it is helpful to use an existing `.mus` file as a reference.

Name the file something relevant, such as your map name. Open it and find the first `"Name"` parameter, then set its value to the file name you chose without the extension.

Next, open your map's sound zoneconfig:

```text
map folder/sound/zoneconfig/mapname.szc
```

Find `"MusicFiles"`. Inside its value array, add the name you chose for your `.mus` file.

{% include alert.html title="Note" type="info" content="The specific `.mus` fields that need editing are covered later in this guide. This first step only registers the file so the sound system can find it." %}

## Setting up aliases to work with music states

{% include alert.html title="Tip" type="info" content="Existing music aliases are useful references because they already have working settings for the music system." %}

There is not much that needs to be done to make an alias work with the music state system, but there is one naming scheme that should be followed:

```text
mus_ + ALIAS NAME YOU WANT + _intro
```

For example:

```text
mus_roundstart_yourmap_intro
```

While the music state system can technically call any alias, the `mus_` and `_intro` naming pattern is hardcoded into `_zm_audio.gsc`. If you do not use this naming scheme, the script can have playback time-related issues.

## Registering your music states

{% include alert.html title="Important" type="warning" content="If you want to override music states for round sounds or similar built-in behavior, call your music state creation functions after `zm_usermap::main()`." %}

In any file where you register music states, it is useful to add these define calls:

```c
#define PLAYTYPE_REJECT 1
#define PLAYTYPE_QUEUE 2
#define PLAYTYPE_ROUND 3
#define PLAYTYPE_SPECIAL 4
#define PLAYTYPE_GAMEEND 5
```

To register a music state, use:

```c
zm_audio::musicState_Create(stateName, playType, musName1, musName2, musName3, musName4, musName5, musName6);
```

`stateName` is the script reference for the music track. You can choose your own name, but use built-in names such as `"round_start"` if you want to replace existing behavior with less friction.

`playType` controls the priority and behavior of the music. Without the define calls above, you cannot use those named references directly.

- `PLAYTYPE_REJECT`: Plays only if no other music is currently playing. This is the lowest priority.
- `PLAYTYPE_QUEUE`: Queues to play after other tracks. The Giant power music is an example use case.
- `PLAYTYPE_ROUND`: Used for round sounds.
- `PLAYTYPE_SPECIAL`: Stops round sounds and anything below its priority. Easter Egg songs commonly use this.
- `PLAYTYPE_GAMEEND`: Stops all other music tracks and plays without interruption. This is the highest priority.

`musName1` through `musName6` reference `.mus` song entries. The value should be your alias name without `mus_` and `_intro`. You only need one value unless you want multiple randomized entries, like The Giant's round start sounds.

## Setting up a music track in your .mus file

Open the `.mus` file you created earlier and go to `StateArray`.

Below is an example `StateArray` entry:

```json
{
  "Name": "roundstart_yourmap",
  "IntroAsset": {
    "AliasName": "mus_roundstart_yourmap_intro",
    "Looping": false,
    "CompleteLoop": false,
    "RemoveAfterPlay": false,
    "PlayAsFirstRandom": false,
    "StartSync": false,
    "StopSync": false,
    "CompleteOnStop": false,
    "LoopStartOffset": 15662,
    "BPM": 120,
    "AssetType": 0,
    "LoopNumber": 1,
    "Order": 0,
    "StartDelayBeats": 0,
    "StartFadeBeats": 0,
    "StopDelayBeats": 0,
    "StopFadeBeats": 4,
    "Meter": 4
  },
  "LoopAssets": [],
  "Order": 0,
  "IsRandom": false,
  "IsSequential": true,
  "SkipPreviousExit": false
}
```

Create a `StateArray` entry for every music track you use as a `musName`.

From the template above, these are the main values to change:

- `"Name"`: Set this to the `musName` value you use in your script create-state call.
- `"AliasName"`: Set this to the full alias name.
- The second `"Order"` value: This is not always required, but Treyarch commonly uses it as a zero-based index for entries in the state array.

Next, go to the bottom of your `.mus` file and find `"StateNames"`. Add an entry string for your `musName`, such as:

```json
"roundstart_yourmap"
```

## Playing a music state

To play a music state, use:

```c
level thread zm_audio::sndMusicSystem_PlayState(stateName);
```

`stateName` is the script name you set in your create-state function.

## Complete

Once the `.mus` file, aliases, state registration, and playback call are all set up, your music state should be ready to test in-game.
