# Instagram Story Builder Template

The Instagram Story Builder template is meticulously crafted to empower users in creating captivating Instagram stories that resonate. Drawing cues from modern design principles and user-centric features, this template caters to a broad spectrum of users, from social media enthusiasts to digital marketing professionals. The primary objective is to simplify the story creation process while offering a plethora of creative tools to make each story unique and engaging.

![Instagram Story Builder Cover](https://i.imgur.com/YMM4qlF.png)

## Overview

Instagram stories are a quintessential aspect of the digital storytelling landscape. The Instagram Story Builder template acknowledges the creative potential of stories and offers a streamlined, intuitive platform to build compelling narratives. By encapsulating a variety of multimedia elements and creative tools, this template presents a robust framework for crafting visually appealing stories that echo with the audience.

## Key Features

### Text Addition Functionality
Annotate your stories with personalized text messages. The text addition tool provides a simple yet powerful interface to inscribe your thoughts and messages onto your visual narrative.

### Image Insertion
Incorporate images into your stories effortlessly. Whether it's a memorable photo or a creative graphic, the image insertion tool ensures your visuals are showcased perfectly.

### Video Insertion
Enrich your storytelling with moving visuals. The video insertion tool facilitates the easy incorporation of video clips into your stories, enhancing the dynamic storytelling experience.

### Element Ordering System
Manage the visual hierarchy of your story elements with ease. The element ordering system allows for intuitive foreground and background management, ensuring a well-composed visual presentation.

### Drag and Resize Elements
Enjoy absolute control over element positioning and sizing. The user-friendly drag and resize functionality ensures your story elements are placed and sized to perfection.

### Text Modification Toolkit
Fine-tune your text elements with our comprehensive text modification toolkit. Tailor the font style, size, color, and alignment to resonate with your narrative theme.

## Installation

To set up the Instagram Story Builder template, follow these steps:

1. Clone the repository to your local machine.

```shell
git clone https://github.com/montagix/instagram-story-builder-template.git
```

2. Navigate to the project directory.

```shell
cd instagram-story-builder-template
```

3. Set up the `.npmrc` file with the following configuration to use GitHub Packages:
```shell
@montagix:registry=https://npm.pkg.github.com/
//npm.pkg.github.com/:_authToken=your-access-key 
```

Replace `your-access-key` with the access token provided by [Montagix](https://montagix.com/).

4. Install the necessary packages using npm:

```shell
npm install
```

5. (Optional) Create a `.env` file in the root directory of the project and add your Giphy API key:

```
VITE_GIPHY_KEY=<your-giphy-api-key>
```

Replace `<your-giphy-api-key>` with your actual Giphy API key to enable GIF functionality.

6. Start the project

```shell
npm start
```