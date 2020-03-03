# Simple Startup Syndication Specification

The Simple Startup Syndication Specification (SSS) is a startup discovery and web content syndication format for GitHub-like websites. SSS is based on Markdown because it's human readable and is faster to parse than XML. The format facilitates improvements in startup health through community building and routine generation using a standard set of metrics to grade the health of a startup A-F and a standard set of metadata to facilitate pay and trade markets.

Simple Startup Syndication (SSS) uses RedCarpet Markdown, which is used by GitHub. All SSS files must conform to the RedCarpet Markdown specification located at <http://github.com/todo_fix_me>.

This specification uses the Astartup Estuary @a-startup and the reference example site can be found at <https://astartup.net>.

## Symbols

|     Symbol | Description |
|-----------:|:------------|
|     Handle | A GitHub account username. |
|       Repo | A GitHub repository. |
|    Estuary | A GitHub personal or organization username, and the `/estuary` folder and contents. |
|     Stream | One of potentially many content streams for a Repo. |
|      River | An accusation of multiple Streams in a single Repo. |

## Macro Statements

There are three Macro Statements: a Description, a Mission and Vision Statement, and a Status. This statements are used by SSS to add a Startup to a River.

### Description

A Description shall be no more than 240 characters.

### Mission and Vision Statement

A Description shall be no more than 240 characters.

### Status

While a Mission and Vision Statement should not change very often, the Status of a Startup is the current primary focus of work for this startup, or an event that currently happening.

A Status shall be no more than 240 characters.

## Cards

Cards are HTML widgets that contains a thumbnail, short description, and date or Live-streaming status with the time the stream began. The CSS Layout for these cards is up to the viewer. Ane example card layout is:

![Image of an SSS Card](./todo_fix_me.png)

## Estuaries, Rivers, and Streams

An **Estuary** in the real world is the where a river meets the ocean. A river is feed by multiple streams, and multiple rivers may combine. An SSS Estuary is the an accusation of multiple SSS Rivers, which is an accusation of multiple SSS Streams. The Estuary is the place where your startup leads to the sea of people.

In order to create an Estuary, there must be a public repository in the github account, hereby refereed to as just the Estuary, with the same name as the account. For example, the Astartup's Estuary is `a-startup`, and there is a repository at `https://github.com/a-startup/a-startup` with a GitHub Pages Wiki located at <https://github.com/a-startup/a-startup.github.io/wiki>.

Each Estuary may have more than one product, and each of these products may have multiple repositories associated with them, so Estuaries are useful to direct users to the repositories that you want them to go to. Each Estuary has one primary Stream called an Ecotone. For example, the AStartup Cookbook is an open-source book on how to invent, launch, and run a startup with IMUL. There is one Estuary for Astartup, and the Astartup Cookbook is a River. Each Repo has it's own Estuary in the the `/wiki/estuary.md` file. Inside of this file contains:

1. The display name of the Estuary in the H1 heading.
1. a thumbnail image containing an alternate description for the `thumbnail.png` file in the `/wiki` folder;
1. a description of the stream;
1. an H2 section labeled Streams that contains an enumerated list of links to the Streams, where the link text is the name of the Stream.

For example:

```Markdown
# Astartup

![Alt text for the a-startup thumbnail.](thumbnail.png)

I am You Language (IMUL) technologies.

## Streams

1. [Astartup Live-stream](https://github.com/a-startup/astartup.livestream/wiki)
1. [Astartup Cookbook](https://github.com/a-startup/astartup.cookbook/wiki)
1. [SSS](https://github.com/a-startup/openstartup/wiki)

### Nav

1. [Ecotone](#Ecotone)
1. [Tools](/tools)
1. [Community](/community)

## Ecotone

{{ StreamMarkdownCode }}
```

### Ecotone

A Ecotone in the real world is the ecosystem between a river and the sea. An SSS Ecotone is the primary stream for the Estuary.

### Streams

Streams are essentially small HTML widgets intended to look good on a smartphone in portrait mode.

```Markdown
## Ecotone


```

### Tools

## License

Copyright © 2019-20 [Kabuki Starship™](https://kabukistarship.com).

This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed with this file, You can obtain one at <https://mozilla.org/MPL/2.0/>.
