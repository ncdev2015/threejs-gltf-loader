import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';

export default class Viewer {
    constructor(width, height) {
        this.width = width;
        this.height = height;

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, this.width / this.height, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer();
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.grid = new THREE.GridHelper(1000, 1000);
        this.stats = new Stats();

        this.renderer.setSize(this.width, this.height);
        this.cube = this.createCube(true);

        this.camera.position.set(1,3,4);

        //this.scene.add(this.grid)
        //this.scene.add(this.cube);

        new RGBELoader()
            .setPath( 'textures/' )
            .load( 'royal_esplanade_1k.hdr', ( texture ) => {

                texture.mapping = THREE.EquirectangularReflectionMapping;

                this.scene.background = texture;
                this.scene.environment = texture;

                // model

                const loader = new GLTFLoader().setPath( 'models/glTF/damage-helmet/' );
                loader.load( 'DamagedHelmet.gltf', ( gltf ) => {

                    this.scene.add( gltf.scene );

                }, undefined, function ( error ) {
                    console.error( error );
                } );

            } );

        // const loader = new GLTFLoader();

        // loader.load( '/models/scene.gltf', (gltf) => {
        //     this.scene.add( gltf.scene );
        // }, undefined, function ( error ) {
        //     console.error( error );
        // } );

        document.body.appendChild(this.stats.dom);

        this.animate();

        window.addEventListener('resize', () => {
            this.onWindowResize();
        });
    }

    onWindowResize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;

        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    animate() {
        const render = () => {
            requestAnimationFrame(render);

            this.controls.update();
            this.renderer.render(this.scene, this.camera);
            this.stats.update();
        }
        render();        
    } 

    createCube(wireframe) {
        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: wireframe } );

        return new THREE.Mesh(geometry, material);
    }
}