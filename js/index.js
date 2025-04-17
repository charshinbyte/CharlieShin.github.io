function startFunction() {
	setTimeout(showPage, 5000);
  }
  
function showPage() {
    $(document).ready(function(){
        $('#loader').fadeOut();
    })
}

var scene, renderer, camera;

function init () {

    //Scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x030012 );

    //Camera
    camera = new THREE.PerspectiveCamera( 45, window.innerWidth/innerHeight, 0.1, 1000 );
    camera.position.z = 50;
    camera.position.y = 1;
    camera.lookAt( scene.position );


    //Renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    container = document.getElementById( 'container' );
    container.appendChild( renderer.domElement );

    function fullScreen () {

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();       
        renderer.setSize( window.innerWidth, window.innerHeight );
    }
                
    window.addEventListener( 'resize', fullScreen, false );

    // const controls = new THREE.OrbitControls(camera);
    // controls.enableZoom = false;

    
    // //disable rotation.
    // controls.enableRotate = true;

    // //disable pan.
    // controls.enablePan = false;
    

}


function config () {

    const pNumber = 5000, pSize = 1.6, defaultAnimationSpeed = 1;
    var pCount = pNumber;

    let bodyPoints;
    
    var particals = new THREE.Geometry();
    var bodyParticals = new THREE.Geometry();

    //particle material.
    var pMaterial = new THREE.PointsMaterial({
        color: new THREE.Color(0xffffff),
        size: pSize,
        sizeAttenuation: false,
        transparent: true
    });

    //Generating random particles on screen.
    for ( var i = 0; i < pCount; i++ ) {   
        var vertex = new THREE.Vector3();
        vertex.x = Math.random() * 500 - 250;
        vertex.y = Math.random() * 500 - 250;
        vertex.z = Math.random() * 500 - 250;
        particals.vertices.push(vertex);
    }

    var pSystem = new THREE.Points(particals, pMaterial);

    pSystem.sortParticles = true;
    pSystem.position.x = -9;

    scene.add(pSystem);

    var objLoader = new THREE.OBJLoader();
    
    var computeShoe, computeGun;

    //Load OBJs

    objLoader.load('models/brain.obj', function ( object ) {
        computeGun = object; 
        object.traverse( function( child ) {
            if( child instanceof THREE.Mesh ) {
<<<<<<< HEAD
                child.geometry.scale(1.0, 1.0, 1.0);
=======
                child.geometry.scale(4.5, 4.5, 4.5);
>>>>>>> parent of 3bf574b (Adjusted geometry size)
                child.geometry.center();
                // child.geometry.translate(-10, -20, -20);

            }
        });
    });

    objLoader.load( 'models/me2.obj', function ( object ){
        computeShoe = object; 
        object.traverse( function( child ){
            if(child instanceof THREE.Mesh){
                // child.geometry.rotateX(-1.57);
                // child.geometry.rotateY(-1.57);

                // child.geometry.translateX();
                child.geometry.center();
                child.geometry.scale( 40.0, 40.0, 40.0 );
            }
        });
    });



    /* computing the random points on OBJs and 
    morphing them to OBJ points*/

    function computeObj( compute ){
        compute.traverse( function ( child ) {
            if ( child instanceof THREE.Mesh ) {
            
                bodyPoints = THREE.GeometryUtils.randomPointsInBufferGeometry( child.geometry, pCount );
                createVertices( bodyParticals, bodyPoints, 0 );
                morphTo( bodyParticals );
            }
        });
    }

    //pushes point positions of custom mesh in an empty array.
    function createVertices ( targetArray, points, yOffset ) {
        for( var i = 0; i < pCount; i++ )
        {
            var vertex = new THREE.Vector3();
            vertex.x = points[i]['x'];
            vertex.y = points[i]['y'] - yOffset;
            vertex.z = points[i]['z'];
            targetArray.vertices[i] = vertex;
        }
    }

    const particalLength = particals.vertices.length;

    // morphs random points to the OBJs
    function morphTo ( newParticals ) {
                
        for ( var i = 0; i < particalLength; i++ ){
            TweenMax.to(particals.vertices[i], 2.5, 
                {ease:Expo.easeIn,
                x: newParticals.vertices[i].x, 
                y: newParticals.vertices[i].y, 
                z: newParticals.vertices[i].z} )
        }
    }

    function explode () {
        for ( var i = 0; i < particalLength; i++ ){
        TweenMax.to( particals.vertices[i], 3, 
		{ease:Expo.easeIn, 
        	x: particals.vertices[i].x + Math.random() * 500 - 250, 
        	y: particals.vertices[i].y + Math.random() * 500 - 250, 
        	z: particals.vertices[i].z + Math.random() * 500 - 250})
        }
    }

    function setColor ( col ) {

        TweenMax.to( pSystem.material.color, 10, { ease: Power2.easeOut, 
        r: col.r,
        g: col.g,
        b: col.b
        });
    }

    function fadeOutText() {
        var text = document.getElementById("home");
        var text2 = document.getElementById("project");

        text.style.opacity = 0; // Slowly decrease opacity to 0
        // Hide the element after the opacity transition is complete
        text.addEventListener('transitionend', function() {
            text.style.display = 'none';

            text2.style.display = 'block';
            setTimeout(function() {
                text2.style.opacity = 1; // Slowly increase opacity to 1
            }, 15);
        }, { once: true });
    }

    function fadeInText() {
        var text = document.getElementById("home");
        var text2 = document.getElementById("project");
        text.style.display = "block"; // Make the div visible
        text2.style.display = "none";

        text.style.opacity = 1;

    }
    // function fadeInText() {
    //     var text = document.getElementById("home");
    //     var text2 = document.getElementById("project");

    //     text2.style.opacity = 0; // Slowly decrease opacity to 0

    //     text2.addEventListener('transitionend', function() {
    //         text.style.display = 'block';
            
    //         text2.style.display = 'none';
    //         setTimeout(function() {
    //             text.style.opacity = 1; // Slowly increase opacity to 1
    //         }, 10);
    //     }, { once: false });
    // }


    function callShoe () {
        fadeInText();
        computeObj( computeShoe );
        setColor( new THREE.Color( 0x2E8B57 ) );
        triggerHandler( 0 );
    }

    function callGun () {
        fadeOutText();
        computeObj( computeGun );
        setColor( new THREE.Color( 0x5048bf) );
        triggerHandler( 1 );
        
    }

    function callExplode () {
        explode();
        triggerHandler( 2 );
    }

    function animate()
    {
        const normalSpeed = ( defaultAnimationSpeed/200 );
        pSystem.rotation.y += normalSpeed;
        particals.verticesNeedUpdate = true;

        window.requestAnimationFrame( animate );
        renderer.render( scene, camera );
    }

    animate();
    setTimeout( callShoe, 5000 );

    const triggers = document.getElementsByClassName( 'triggers')[0].querySelectorAll('span');
    triggers[0].addEventListener( 'click', callShoe );
    triggers[1].addEventListener( 'click', callGun );
    triggers[2].addEventListener( 'click', callExplode );


    function triggerHandler ( active ) {
        for ( var i = 0; i < triggers.length; i++ ) {
		    if ( active == i ) {
                triggers[i].setAttribute( 'data-disabled', true )
                triggers[i].classList.add( "active" );
				
		    } else {
                triggers[i].setAttribute( 'data-disabled', false )
                triggers[i].classList.remove( "active" );
            }
	    }	
    }
    

}

init();
config();
