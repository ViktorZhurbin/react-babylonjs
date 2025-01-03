import { useEffect, useRef, useState } from 'react';
import '@babylonjs/core/Physics/physicsEngineComponent';
import '@babylonjs/core/Lights/Shadows/shadowGeneratorSceneComponent';
import { PhysicsImpostor, Color3, FresnelParameters, Vector3, Mesh, Texture, Nullable, CannonJSPlugin } from '@babylonjs/core';
import { Engine, Scene } from 'react-babylonjs';
import * as CANNON from 'cannon';
import { AdvancedDynamicTexture } from '@babylonjs/gui';

const BouncySphere = ({ fontsReady, position, name, color }) => {
  const sphereRef = useRef < Nullable < Mesh >> null;
  const adtRef = (useRef < AdvancedDynamicTexture) | (null > null);

  useEffect(() => {
    if (adtRef.current) {
      console.log('marking dirty');
      adtRef.current.markAsDirty();
    } else {
      console.log('no ref');
    }
  }, [fontsReady, adtRef]);

  const onButtonClicked = () => {
    if (sphereRef.current) {
      sphereRef.current.physicsImpostor.applyImpulse(
        Vector3.Up().scale(10),
        sphereRef.current.getAbsolutePosition()
      );
    }
  };

  return (
    <sphere ref={sphereRef} name={`${name}-sphere`} diameter={2} segments={16} position={position}>
      <physicsImpostor
        type={PhysicsImpostor.SphereImpostor}
        _options={{ mass: 1, restitution: 0.9 }}
      />
      <standardMaterial
        name={`${name}-material`}
        specularPower={16}
        diffuseColor={Color3.Black()}
        emissiveColor={color}
        reflectionFresnelParameters={FresnelParameters.Parse({
          isEnabled: true,
          leftColor: [1, 1, 1],
          rightColor: [0, 0, 0],
          bias: 0.1,
          power: 1,
        })}
      />
      <plane
        name={`${name}-dialog`}
        size={2}
        position={new Vector3(0, 1.5, 0)}
        sideOrientation={Mesh.BACKSIDE}
      >
        <advancedDynamicTexture
          name="dialogTexture"
          ref={adtRef}
          height={1024}
          width={1024}
          createForParentMesh={true}
          hasAlpha={true}
          generateMipMaps={true}
          samplingMode={Texture.TRILINEAR_SAMPLINGMODE}
        >
          <rectangle name={`${name}-rect`} height={0.5} width={1} thickness={12} cornerRadius={12}>
            <rectangle>
              <babylon-button
                name={`${name}-close-icon`}
                background="green"
                onPointerDownObservable={onButtonClicked}
              >
                <textBlock
                  text={`${fontsReady ? '\uf00d' : 'X'} click ${name}`}
                  fontFamily="FontAwesome"
                  fontStyle="bold"
                  fontSize={200}
                  color="white"
                />
              </babylon-button>
            </rectangle>
          </rectangle>
        </advancedDynamicTexture>
      </plane>
    </sphere>
  )
};

// build error that 'window is not defined'
// window.CANNON = CANNON;

const gravityVector = new Vector3(0, -9.81, 0);
const RADIUS = 5;
const NUMBER_OF_BOXES = 8;

const App = () => {
  const [fontsReady, setFontsReady] = useState(false);

  const faLoaded = useRef(false);
  useEffect(() => {
    if (document.fonts.check('16px FontAwesome') === false) {
      document.fonts.load('16px FontAwesome').then(() => {
        if (faLoaded.current !== true) {
          faLoaded.current = true;
          setFontsReady(true);
        }
      });
    } else if (faLoaded.current !== true) {
      faLoaded.current = true;
      setFontsReady(true);
    }
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Engine antialias={true} adaptToDeviceRatio={true} canvasId="sample-canvas">
          <Scene enablePhysics={[gravityVector, new CannonJSPlugin(undefined, undefined, CANNON)]}>
            <arcRotateCamera
              name="arc"
              target={new Vector3(0, 1, 0)}
              alpha={-Math.PI / 2}
              beta={0.2 + Math.PI / 4}
              wheelPrecision={50}
              radius={14}
              minZ={0.001}
              lowerRadiusLimit={8}
              upperRadiusLimit={20}
              upperBetaLimit={Math.PI / 2}
            />
            <hemisphericLight name="hemi" direction={new Vector3(0, -1, 0)} intensity={0.8} />
            <directionalLight
              name="shadow-light"
              setDirectionToTarget={[Vector3.Zero()]}
              direction={Vector3.Zero()}
              position={new Vector3(-40, 30, -40)}
              intensity={0.4}
              shadowMinZ={1}
              shadowMaxZ={2500}
            >
              <shadowGenerator
                mapSize={1024}
                useBlurExponentialShadowMap={true}
                blurKernel={32}
                darkness={0.8}
                forceBackFacesOnly={true}
                depthScale={100}
                shadowCastChildren
              >
                {Array.from(new Array(NUMBER_OF_BOXES), (_, index) => index).map((x) => (
                  <BouncySphere
                    key={x}
                    name={x.toFixed()}
                    fontsReady={fontsReady}
                    position={
                      new Vector3(
                        Math.cos(((2 * Math.PI) / NUMBER_OF_BOXES) * x) * RADIUS,
                        3,
                        Math.sin(((2 * Math.PI) / NUMBER_OF_BOXES) * x) * RADIUS
                      )
                    }
                    color={
                      new Color3(
                        Math.abs(x - NUMBER_OF_BOXES / 2) / 10,
                        Math.abs(x - NUMBER_OF_BOXES / 2) / 10,
                        Math.abs(x - NUMBER_OF_BOXES / 2) / 10
                      )
                    }
                  />
                ))}
              </shadowGenerator>
            </directionalLight>

            <ground name="ground1" width={24} height={24} subdivisions={2} receiveShadows={true}>
              <physicsImpostor
                type={PhysicsImpostor.BoxImpostor}
                _options={{ mass: 0, restitution: 0.9 }}
              />
            </ground>
            <vrExperienceHelper
              webVROptions={{ createDeviceOrientationCamera: false }}
              enableInteractions={true}
            />
          </Scene>
        </Engine>
      </header>
    </div>
  )
};

export { App as default };
