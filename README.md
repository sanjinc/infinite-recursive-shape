![](https://github.com/sanjinc/infinite-recursive-shape/workflows/Node%20CI/badge.svg)

# Infinite recursive shape

## Challenge

Write a recursive method that creates an infinite rectangles.

## Solution

The approach taken generates one quarter of the result (top left) which is then mirrored horizontally and vertically.

## Examples

For end result check following screenshots:

- [Width:20 / Height:40 / Padding:6](./screenshot-20-40-6.png)
- [Width:20 / Height:60 / Padding:10](./screenshot-60-60-10.png)
- [Width:20 / Height:80 / Padding:20](./screenshot-80-100-20.png)

## Prerequisites

- [Node](https://nodejs.org)
- [Yarn](https://yarnpkg.com)

Install dependencies with `yarn install` in project root.

## How to run project

Run `yarn start` in project root.

Project will run on localhost port 8080.

## How to build project

Run `yarn build` in project root.

Production build will be generated in `dist` folder.

## How to run unit testing

Run `yarn test` in project root.
