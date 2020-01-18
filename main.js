var width = window.innerWidth;
var height = window.innerHeight;
// 윈도우 창의 너비와 높이를 변수에 저장합니다. 해당 변수는 나중에 쓰임/.

var renderer = new THREE.WebGLRenderer({ antialias: true });
// 첫째 줄에서 WebGL 렌더러를 정의했습니다. 여러분은 첫 번째 인수에서 렌더러의 옵션을 맵(map)처럼 통과할 수 있습니다. 여기에서는 antialias를 true로 설정했습니다. 오브젝트의 가장자리가 들쭉날쭉하지 않고 매끄럽기를 바라기 때문이죠.
renderer.setSize(width, height);
//둘째 줄에서 렌더러 크기를 윈도우 창 크기에 맞추었습니다. 
document.body.appendChild(renderer.domElement);
//셋째 줄에서는 렌더러의 canvas 요소를 document에 추가했고요. (여러분은 $('body').append(renderer.domElement) 식으로 jQuery와 같은 라이브러리를 써서 작업해도 됩니다.)
var scene = new THREE.Scene;
//마지막 줄에서 장면을 정의했습니다. 여기서는 인자가 필요 없습니다.

// 이제 그려질 무언가를 추가해 보죠. 입방체로 합시다. 제일 단순한 3D 오브젝트이니까요.
//  Three.js에서는 장면에 그려질 오브젝트를 메시(meshes)라고 칭합니다. 
//  각 메시에는 입체 형상(geometry)와 머리티얼(material)이 있어야 합니다. 
//  입체 형상은 점의 집합으로 각각의 점들은 오브젝트를 만들기 위해 연결되어야 합니다. 
//  머티리얼은 간단히 오브젝트에 바르는 페인트입니다(페인트 대신 그림이라고 하지만, 이 튜토리얼의 주제는 아니죠).
//   자, 입방체를 만들어 봅시다. 운 좋게도 Three.js에는 도형 원형(단순한 모양)을 만들어 주는 보조 기능이 있습니다.

var CylinderGeometry = new THREE.CylinderGeometry( 100, 100, 120, 8 ); //첫번째 인자 : 윗 지름/ 두번재 인자 : 아랫 지름 / 세번재 인자 : 높이 / 네번째 인자 : 나눔갯수
// 보시다시피 맨 먼저 입체 형상(geometry)을 생성합니다. 인자에서는 입방체의 크기 즉, 너비와 높이와 깊이를 정의해 줍니다.
var CylinderMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
// 그다음, 입방체의 머티리얼을 정의합니다. 
// Three.js에 몇 가지 머티리얼 종류가 있지만, 이번에는 THREE.MeshLambertMaterial을 사용할 겁니다. 
// 나중에 조명을 어느 정도 넣고 싶기 때문이죠(이 머티리얼은 조명 계산에 관한 람베르트의 알고리즘을 이용합니다). 
// 여러분은 렌더러에서 했듯이 map처럼 첫 번째 인자의 옵션을 그냥 넘길 수 있습니다. 
// Three.js에서 좀 더 복잡한 오브젝트에 대한 일종의 관례인 것이죠.
//  여기서는 색상만 사용하고, 해당 값을 16진수로 전달합니다.
var Cylinder = new THREE.Mesh(CylinderGeometry, CylinderMaterial);
// 셋째 줄에서는 앞서 생성한 입체 형상과 머티리얼을 이용해 메시를 만듭니다. 
// 그다음, 더 좋아 보이도록 입방체를 Y축으로 45도 회전시킵니다. 
// 각도를 라디안(radians)으로 바꿔야 합니다. 여러분이 기억할지 모를, 
// 고등학교 물리 시간에 배운 공식인 Math.PI * 45 / 180에서 변경하게 되죠. 
// 마침내 입방체가 장면에 넣어졌네요.
Cylinder.rotation.y = Math.PI * 45 / 180;
 //장면에 cube를 넣습니다.
 scene.add(Cylinder);

// 무언가를 화면에 렌더링하기 위해서는 우선 카메라를 장면에 넣어야 합니다. 
// 그렇게 해서 렌더러는 어떤 관점에서 오브젝트를 렌더링할지 알게 됩니다. 
// Three.js에 카메라 유형이 몇 가지 있지만, 여러분은 아마 THREE.PerspectiveCamera만 사용할 겁니다. 
// 이 카메라는 우리가 세상을 보는 것처럼 장면을 보여줍니다. 카메라를 하나 만들어 보죠.

var camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000);
// "무언가를 화면에 렌더링하기 위해서는 우선 카메라를 장면에 넣어야 합니다. 그렇게 해서 렌더러는 어떤 관점에서 오브젝트를 렌더링할지 알게 됩니다."
// 카메라를 생성하는 것은 지금껏 해온 작업 중 나머지보다 조금 더 복잡합니다. 
// 첫 번째 인자에서는 카메라의 위치에서 보여줄 각도(angle)인 FOV(시야)를 정의합니다. 
// FOV가 45도에서 자연스럽게 보입니다. 다음에는 카메라의 화면 종횡비를 정의합니다. 
// 여러분이 특수 효과를 원하지 않는 한, 이는 언제나 렌더러의 너비를 높이로 나눈 값입니다. 
// 마지막 숫자 2개는 오브젝트가 카메라에 얼마나 가까워지고 멀어져서 그려질 수 있는지를 정의합니다.
camera.position.y = 50;
camera.position.z = 270;

// Three.js에서 만들어진 오브젝트 모두를 기본적으로 장면의 중앙(x: 0, y: 0, z: 0)에 
// 위치시켜야 하므로 지금은 카메라를 조금 더 뒤로, 조금 더 위로 이동시킵니다.
scene.add(camera);
 
renderer.render(scene, camera);

// 입방체의 상단만 볼 수 있을 겁니다. 왜냐하면, 카메라를 위로 옮기긴 했지만, 
// 카메라는 여전히 똑바로 앞을 바라보고 있기 때문이죠. 
// 이는 카메라에게 어느 지점을 봐야 하는지 알려주어 해결할 수 있습니다. 
// 카메라 위치를 설정하는 줄 아래에 아래 코드를 추가해 주세요.

camera.lookAt(Cylinder.position);

// 입방체는 검습니다. 장면에 빛을 주는 조명이 없기 때문이죠. 그렇기에 완전히 어두운 방과 같습니다. 
// 배경이 하얀 이유는 입방체로부터 그려질 게 없기 때문입니다. 
// 그렇게 되지 않도록 skybox라 칭하는 테크닉을 쓰겠습니다. 
// 무엇보다도 장면의 배경을 보여줄 커다란 입방체 하나를 넣을 겁니다. 
// (일반적으로 열린 공간이라면 어느 정도 먼 영역이 되겠죠.) skybox를 만들어 봅시다. 
// 아래 코드는 renderer.render을 호출하기 전에 있어야 합니다.

var skyboxGeometry = new THREE.CylinderGeometry(10000, 10000, 10000);
var skyboxMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.BackSide });
var skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterial);
 
scene.add(skybox);

// 위의 코드는 입방체를 생성하는 코드와 유사합니다. 
// 그런데 이번에는 입체 형상(geometry)이 더 큽니다. 
// skybox에 빛을 비추지 않으므로 THREE.MeshBasicMaterial도 사용했습니다.
//  더불어 머티리얼에 전달한 추가 인자를 알려줍니다. 
//  side: THREE.BackSide 입방체가 안쪽를 보여줄 것이므로 그릴 방향을 바꿔주어야 합니다.
//   (Three.js는 보통 바깥쪽 벽만 그립니다.)

// 지금은 렌더링된 장면이 완전히 검습니다. 
// 그 문제를 해결하려면 장면에 조명을 넣어야 합니다.
//  THREE.PointLight을 사용하겠습니다. 
//  이는 전구와 같은 빛을 발산합니다. 
//  아래 코드를 skybox 다음에 추가해 주세요.

var pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(10, 500, 400);
 
scene.add(pointLight);

// 이제 장면에 움직임을 어느 정도 넣겠습니다. 입방체를 Y축을 중심으로 회전시켜 보죠. 그런데 우선 장면을 렌더링할 방법을 변경해야 합니다. 
// renderer.render 호출 한 번에 장면의 현재 상태를 한번 렌더링합니다.
// 그렇기에 입방체에 어느 정도 애니메이션을 적용해도 입방체가 움직이는 것을 알 수 없습니다.
//  방법을 변경하기 위해서는 애플리케이션에 렌더 루프(render loop)를 추가해야 합니다. 이는 renderAnimationFrame 함수를 써서 할 수 있습니다.
//   그런 목적에 특별히 쓰이도록 만들어진 함수이죠. 주요 브라우저 대부분에서 지원되며, 
//   지원되지 않은 브라우저에 대해 Three.js 자체에 폴리필(polyfill)이 들어 있습니다. 
// 자, 바꿔보죠.

renderer.render(scene, camera);
var clock = new THREE.Clock;
// 하지만 브라우저에 로딩되자마자 그 함수가 전달되도록 호출할 겁니다. 그러니 화면에 보인 장면에서 아무것도 변하지 않고, 입방체는 그대로 움직이지 않은 채로 있습니다.
//  이 문제를 해결해 봅시다. Three.js에는 오브젝트를 부드럽게 애니메이션 시킬 수 있는 THREE.Clock이 들어 있습니다. 
// 우선 render 함수를 정의하기 전에 초기화를 해주세요.

function render() {
    renderer.render(scene, camera);
    Cylinder.rotation.y += clock.getDelta();
    requestAnimationFrame(render);
}
// 자, clock.getDelta를 호출할 때마다 마지막 호출 이후의 시간을 밀리세컨드(milliseconds) 단위로 돌려줄 겁니다. 
// 그 값은 입방체를 아래와 같이 회전하는 데 사용됩니다.
// 사실 함수 안에는 루프가 없습니다. 브라우저를 정지시킬지 모르기 때문이죠. requestAnimationFrame 함수는 setTimeout 같이 동작합니다.
render();

 







