import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const sizes = {
    width: 800,
    height: 600
}
const fontLoader = new THREE.FontLoader()


fontLoader.load(
    '/fonts/helvetiker_regular.typeface.json',
    (font) =>
    {
        const textGeometry = new THREE.TextGeometry(
            'My 1st Three.js',
            {
                font: font,
                size: 5,
                height: 0.1,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 5
            }
        )
        const textMaterial = new THREE.MeshBasicMaterial()
        const text = new THREE.Mesh(textGeometry, textMaterial)
        textGeometry.center()
        scene.add(text)
    }
)

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height)
camera.position.z = 50
scene.add(camera)

const canvas = document.querySelector('canvas.webgl')


const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);


renderer.render(scene, camera)

const geometry = new THREE.TorusGeometry(30, 3, 30, 100)
const material = new THREE.MeshBasicMaterial({color : 0xFFBCBC}) 
const donut = new THREE.Mesh(geometry, material)

scene.add(donut)

// lights the shade
const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(10, 10, 10)


// light everything
const ambientLight = new THREE.AmbientLight(0xffffff)
ambientLight.intensity = 0.5

const directionalLight = new THREE.DirectionalLight(0x00fffc, 0.3)
scene.add(directionalLight)

scene.add(pointLight, ambientLight, directionalLight)

const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(100, 50)
scene.add(lightHelper, gridHelper)

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true

const animate = () =>
{
    requestAnimationFrame(animate)
    donut.rotation.x += 0.01 / 10
    donut.rotation.y += 0.05 / 10
    donut.rotation.z += 0.01 / 10
    renderer.render(scene, camera)
}

const createStar = () =>
{
    const geometry = new THREE.SphereGeometry(0.1, 25, 25)
    const material = new THREE.MeshStandardMaterial({color:0xFFBCBC})
    const star = new THREE.Mesh(geometry, material)

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100))
    
    star.position.set(x, y, z)
    scene.add(star)

}
animate()
Array(500).fill().forEach(createStar)