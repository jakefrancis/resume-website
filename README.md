# My Personal Portfolio Website

This site is build with HTML CSS and Vanilla, Javascript.

I originally was going to build it with the React frame work, but thought it was overkill for a small static website.

## Highlights

### Background Particles

Written in vanilla `javascript` the background consists of artistic representations of the [Bohr Model](https://en.wikipedia.org/wiki/Bohr_model) of the atom.

When the site gets scrolled in either direction a force is applied to the particle's velocity in the direction of the scroll event.
Additionally, when the screen is resized they are either regenerated if they were lost off screen or they rapidly expand outward from the center of the window to fill the screen.
A friction force is applied to any particle that is traveling faster than it's randomly generated  maximum velocity.

[Github repo](https://github.com/jakefrancis/particles)

### Slider

A simple mouse and touch based slider built with `javascript`. 

##### Usage

A parent container element's id is fed into a `buildSlider` function and all children of the parent container are automatically converted into slides.
Page indicators are automatically added below the parent container. 

```html
<div id='viewport'></div>
<script src='slider.js'></script?>
```
```javascript
  buildSlider('viewport')
```

##### Features

When a slide moves past 10% of its width it will automatically move to the next slide depending on the direction it was moved. 
The slide will snap or "spring" back to it's center most point when it has been released. The movement is calculated using [Hooke's Law](https://en.wikipedia.org/wiki/Hooke%27s_law)
for spring forces.

[Github repo](https://github.com/jakefrancis/slider)
