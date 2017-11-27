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

function _generatePartialSCSS(filename,params,image,filePath,prefixName) {
    const name = prefixName + filename.split("\\").pop().split("/").pop().split(".").shift();

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
$${name}-image: '${filePath}';
$${name}: (${params.x}px, ${params.y}px, ${-params.x}px, ${-params.y}px, ${params.width}px, ${params.height}px, ${image.width}px, ${image.height}px, '${filePath}', '${name}', );
`;
}

function generateSCSS(imagesDirectory,spriteFilename,prefixName,padding=0){
    Spritesmith.run({
        src: fs.readdirSync(imagesDirectory).filter((s)=>s.indexOf("png")!==-1).map((s)=>imagesDirectory+'/'+s),
        padding: padding
    }, function handleResult(err, result) {
        if(err) {
            console.error(err);
            process.exit(1);
        }
        let str=``, names=[];
        fs.writeFileSync(__dirname + `/../src/sass/generated/${spriteFilename}`,result.image) ;
        for(const i in result.coordinates){
            if(result.coordinates.hasOwnProperty(i)){
                str+=_generatePartialSCSS(i,result.coordinates[i],result.properties,`./generated/${spriteFilename}`,prefixName);
                names.push(`$${prefixName}` + i.split("\\").pop().split("/").pop().split(".").shift());
            }
        }

        str+=`
$spritesheet-width: ${result.properties.width}px;
$spritesheet-height: ${result.properties.height}px;
$spritesheet-image: './${spriteFilename}';
$spritesheet-sprites: (${names.join(', ')}, );
$spritesheet: (${result.properties.width}px, ${result.properties.height}px, './generated/${spriteFilename}', $spritesheet-sprites, );

    `;
        fs.writeFileSync(__dirname + `/../src/sass/generated/${spriteFilename.replace(/\.\w+$/,'.scss')}`,str+helpers) ;
        console.log(`spriteFilename done.`);
    });
}

generateSCSS(__dirname + '/../src/images/ships','ship-sprite.png','ship');
//4px should prevent stupid overlapping in browser. haha chrome.
generateSCSS(__dirname + '/../src/images/locks','ship-locks.png', 'lock', 4);
