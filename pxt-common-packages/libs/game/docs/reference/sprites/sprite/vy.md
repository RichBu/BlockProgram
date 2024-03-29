# vy (property)

Get or set the vertical speed of motion for a sprite in pixels per second.

## Get

Get the vertical speed of the sprite.

```block
let mySprite: Sprite = null

let vertSpeed = mySprite.vy
```
```typescript-ignorelet
vertSpeed = mySprite.vy
```

### Returns

* a [number](/types/number) that is the current vertical speed of the sprite in pixels per second.

## Set

```block
let mySprite: Sprite = null

mySprite.vy = 0
```

```typescript-ignore
mySprite.vy = 0
```

### Parameter

* **value**: the new vertical speed for the sprite in pixels per second.

## Sprite motion

A sprite that isn't a projectile has no motion when it's created. You make the sprite move by setting it's speed, or _velocity_, in the **x** direction, the **y** direction, or both. For the **y** direction, setting the speed to a positive value makes the sprite move to the bottom. To make the sprite move to the top, you use a negative speed value.

If you don't follow the sprite with the _camera_ or check for when the sprite reaches the end of the screen, the sprite will move off the screen.

### ~ hint

**What is speed, really?**

Speed, or velocity, is how much distance an object moves during some period of time. A car can travel 50 kilometers in one hour so it moves at 50 kilometers per hour (50 km/h). A jet airplane can fly as fast as 913 k/mh and travel across some continents in 3 or 4 hours.

Distance in your game is measured in pixels so the speed of a sprite is in _pixels per second_. If the screen is 120 pixels high, then a sprite with a speed of 40 pixels per second will move across the screen in 3 seconds.

### ~

## Examples #example

### Go to each side

Send a sprite moving to the bottom at `40` pixels per second. When it reaches the bottom side of the screen, send it back to the top side.

```blocks
namespace SpriteKind {
    export const Example = SpriteKind.create()
}
let mySprite = sprites.create(img`
7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
7 7 2 2 2 2 2 2 2 2 2 2 2 2 7 7 
7 5 7 2 2 2 2 2 2 2 2 2 2 7 4 7 
7 5 5 7 2 2 2 2 2 2 2 2 7 4 4 7 
7 5 5 5 7 2 2 2 2 2 2 7 4 4 4 7 
7 5 5 5 5 7 2 2 2 2 7 4 4 4 4 7 
7 5 5 5 5 5 7 2 2 7 4 4 4 4 4 7 
7 5 5 5 5 5 5 7 7 4 4 4 4 4 4 7 
7 5 5 5 5 5 5 7 7 4 4 4 4 4 4 7 
7 5 5 5 5 5 7 8 8 7 4 4 4 4 4 7 
7 5 5 5 5 7 8 8 8 8 7 4 4 4 4 7 
7 5 5 5 7 8 8 8 8 8 8 7 4 4 4 7 
7 5 5 7 8 8 8 8 8 8 8 8 7 4 4 7 
7 5 7 8 8 8 8 8 8 8 8 8 8 7 4 7 
7 7 8 8 8 8 8 8 8 8 8 8 8 8 7 7 
7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
`, SpriteKind.Example)
mySprite.top = 0
mySprite.vy = 40
game.onUpdateInterval(500, function () {
	if (mySprite.y < 0 || mySprite.y > scene.screenWidth()) {
        mySprite.vy = mySprite.vy * -1
    }
})
```

### How many pixels travelled?

Set a sprite in motion. Check after about `1` second and see how far the sprite has travelled.

```blocks
namespace SpriteKind {
    export const Example = SpriteKind.create()
}
let interval = 0
let mySprite = sprites.create(img`
7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
7 7 2 2 2 2 2 2 2 2 2 2 2 2 7 7 
7 5 7 2 2 2 2 2 2 2 2 2 2 7 4 7 
7 5 5 7 2 2 2 2 2 2 2 2 7 4 4 7 
7 5 5 5 7 2 2 2 2 2 2 7 4 4 4 7 
7 5 5 5 5 7 2 2 2 2 7 4 4 4 4 7 
7 5 5 5 5 5 7 2 2 7 4 4 4 4 4 7 
7 5 5 5 5 5 5 7 7 4 4 4 4 4 4 7 
7 5 5 5 5 5 5 7 7 4 4 4 4 4 4 7 
7 5 5 5 5 5 7 8 8 7 4 4 4 4 4 7 
7 5 5 5 5 7 8 8 8 8 7 4 4 4 4 7 
7 5 5 5 7 8 8 8 8 8 8 7 4 4 4 7 
7 5 5 7 8 8 8 8 8 8 8 8 7 4 4 7 
7 5 7 8 8 8 8 8 8 8 8 8 8 7 4 7 
7 7 8 8 8 8 8 8 8 8 8 8 8 8 7 7 
7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
`, SpriteKind.Example)
mySprite.top = 0
mySprite.vy = 60
game.onUpdateInterval(1000, function () {
    if (interval == 1) {
        mySprite.vy = 0
        mySprite.say("I went " + mySprite.top + " pixels")
    }
    interval += 1
})
```

## See also #seealso

[vx](/reference/sprites/sprite/vx),
[camera follow sprite](/reference/scene/camera-follow-sprite)