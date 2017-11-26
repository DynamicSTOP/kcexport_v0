const Spritesmith = require('spritesmith'), fs = require("fs");

const helpers = `
@mixin sprite-width($sprite) {
    width: nth($sprite, 5);
}

@mixin sprite-height($sprite) {
    height: nth($sprite, 6);
}

@mixin sprite-position($sprite) {
    $sprite-offset-x: nth($sprite, 3);
    $sprite-offset-y: nth($sprite, 4);
    background-position: $sprite-offset-x  $sprite-offset-y;
}

@mixin sprite-image($sprite) {
    $sprite-image: nth($sprite, 9);
    background-image: url(#{$sprite-image});
}

@mixin sprite($sprite) {
@include sprite-image($sprite);
@include sprite-position($sprite);
@include sprite-width($sprite);
@include sprite-height($sprite);
}

@mixin sprites($sprites) {
@each $sprite in $sprites {
        $sprite-name: nth($sprite, 10);
    .#{$sprite-name} {
        @include sprite($sprite);
        }
    }
}
`;

function shipScss(path,params,image) {
    const name = "ship" + path.split("\\").pop().split("/").pop().split(".").shift();

    return `
$${name}-name: '${name}';
$${name}-x: ${params.x}px;
$${name}-y: ${params.y}px;
$${name}-offset-x: ${-params.x}px;
$${name}-offset-y: ${-params.y}px;
$${name}-width: ${params.width}px;
$${name}-height: ${params.height}px;
$${name}-total-width: ${image.width}px;
$${name}-total-height: ${image.height}px;
$${name}-image: './generated/ship-sprite.png';
$${name}: (${params.x}px, ${params.y}px, ${-params.x}px, ${-params.y}px, ${params.width}px, ${params.height}px, ${image.width}px, ${image.height}px, './generated/ship-sprite.png', '${name}', );
`;
}


Spritesmith.run({
    src: fs.readdirSync(__dirname + '/../src/images/ships').map((s)=>__dirname + '/../src/images/ships/'+s),
}, function handleResult(err, result) {
    if(err)return console.error(err);
    let str=``, names=[];
    fs.writeFileSync(__dirname + '/../src/sass/generated/ship-sprite.png',result.image) ;
    for(const i in result.coordinates){
        if(result.coordinates.hasOwnProperty(i)){
            str+=shipScss(i,result.coordinates[i],result.properties);
            names.push("$ship" + i.split("\\").pop().split("/").pop().split(".").shift());
        }
    }

    str+=`
$spritesheet-width: ${result.properties.width}px;
$spritesheet-height: ${result.properties.height}px;
$spritesheet-image: './ship-sprite.png';
$spritesheet-sprites: (${names.join(', ')}, );
$spritesheet: (${result.properties.width}px, ${result.properties.height}px, './generated/ship-sprite.png', $spritesheet-sprites, );

    `;
    fs.writeFileSync(__dirname + '/../src/sass/generated/ship-sprite.scss',str+helpers) ;
});


