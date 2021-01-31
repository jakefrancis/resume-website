class Point {
  constructor(x,y){
    this.x = x
    this.y = y
  }
}

class Rectangle {
  constructor(x,y,w,h){
    this.x = x
    this.y = y
    this.w = w
    this.h = h
  }
  contains(point){
    return(point.x > this.x - this.w &&
        point.x < this.x + this.w &&
        point.y > this.y - this.h &&
        point.y < this.y + this.h
      )
  }
}

class QuadTree {
  constructor(boundary, n){
    this.boundary = boundary
    this.capacity = n
    this.points = []
    this.divided = false
  }

  subdivide (){
    //These only exist to make the code more legible
    let x = this.boundary.x
    let y = this.boundary.y
    let w = this.boundary.w
    let h = this.boundary.h

    let tl = new Rectangle(x - w/2, y - h/2, w/2, h/2)
    this.topLeft = new QuadTree(tl, this.capacity)

    let tr = new Rectangle(x + w/2, y - h/2, w/2, h/2)
    this.topRight = new QuadTree(tr, this.capacity)

    let bl = new Rectangle(x - w/2, y + h/2, w/2, h/2)
    this.bottomLeft = new QuadTree(bl, this.capacity)

    let br = new Rectangle(x + w/2, y + h/2, w/2, h/2)
    this.bottomRight = new QuadTree(br, this.capacity)
    this.divided = true
  }

  insert(point){
    if(this.boundary.contains(point)){
      if(this.points.length < this.capacity){
        this.points.push(point)
      } else {
       if(!this.divided){
          this.subdivide()         
        }
          this.topLeft.insert(point)
          this.topRight.insert(point)
          this.bottomLeft.insert(point)
          this.bottomRight.insert(point)      

    }
  }
  }
}


