function setup(){
  let boundary = new Rectangle(200,200,200,200)
  let qt = new QuadTree(boundary, 4)
  console.log(qt)

  for(let i = 0; i < 8 ; i++){
    let p = new Point(randomFromRange(0, boundary.w), randomFromRange(0, boundary.h))
    console.log(p)
    qt.insert(p)
  }
  console.log(qt)
}

setup()