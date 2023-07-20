<p align="center">
  <a href="https://solana.com">
    <img alt="Solana" src="https://i.imgur.com/uBVzyX3.png" width="250" />
  </a>
</p>

[![Build status][travis-image]][travis-url] [![Gitpod
Ready-to-Code](https://img.shields.io/badge/Gitpod-Ready--to--Code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/solana-labs/example-helloworld)

[travis-image]:
https://travis-ci.org/solana-labs/example-helloworld.svg?branch=master
[travis-url]: https://travis-ci.org/solana-labs/example-helloworld

# Hello world en Solana

Este proyecto demuestra como usar el [Solana Javascript
API](https://github.com/solana-labs/solana-web3.js) para interactuar con los programas en la Solana blockchain.

El proyecto incluye:

* Un programa en cadena de hello world
* Un cliente que manda un "hello" a una cuenta y recibe el número de veces que "hello" ha sido enviado

## Traducciones
- [Inglés](README.md)
- [Chino Tradicional](README_ZH_TW.md)
- [Chino Simplificado](README_ZH_CN.md)

## Tabla de Contenidos
- [Hello world en Solana](#hello-world-on-solana)
  - [Tabla de Contenidos](#table-of-contents)
  - [Inicio Rápido](#quick-start)
    - [Configurar CLI](#configure-cli)
    - [Iniciar Solana clúster local](#start-local-solana-cluster)
    - [Instalar dependenciasnpm](#install-npm-dependencies)
    - [Crear el programa en cadena](#build-the-on-chain-program)
    - [Lanzar el programa en cadena](#deploy-the-on-chain-program)
    - [Ejecutar el cliente de JavaScript](#run-the-javascript-client)
    - [Resultado Esperado](#expected-output)
      - [¿No ves el resultado esperado?](#not-seeing-the-expected-output)
    - [Personalizar el Programa](#customizing-the-program)
  - [Aprende sobre Solana](#learn-about-solana)
  - [Aprende sobre el Cliente](#learn-about-the-client)
    - [Punto de Entrada](#entrypoint)
    - [Establecer una conneción con el clúster](#establish-a-connection-to-the-cluster)
    - [Revisar que el programa helloworld en cadena haya sido lanzado](#check-if-the-helloworld-on-chain-program-has-been-deployed)
    - [Enviar una transacción "Hello" al programa en cadena](#send-a-hello-transaction-to-the-on-chain-program)
    - [Consulta la cuenta de Solana usada en la transacción de "Hello"](#query-the-solana-account-used-in-the-hello-transaction)
  - [Aprender sobre el programa en cadena](#learn-about-the-on-chain-program)
    - [Programando en Solana](#programming-on-solana)
  - [Apuntando a un clúster público de Solana](#pointing-to-a-public-solana-cluster)
  - [Expandir tus habilidades con ejemplos avanzados](#expand-your-skills-with-advanced-examples)
  
  ## Inicio Rápido

[![Abrir en
Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/solana-labs/example-helloworld)

Si decides abrir en Gitpod entonces puedes usar como referencia
[README-gitpod.md](README-gitpod.md), de lo contrario continúa leyendo.

Las siguientes dependencias son requridas para crear y lanzar este ejemplo. Dependiendo
de tu OS puede ser que ya estén instaladas:

- Instalar node (v14 recomendada)
- Instalar npm
- Instalar Rust v1.56.1 o posterior de https://rustup.rs/
- Instalar Solana v1.8.14 o posterior de
  https://docs.solana.com/cli/install-solana-cli-tools

Si es tu primer vez usando Rust, estas [Installation
Notes](README-installation-notes.md) podrían ser útiles.

### Configurar CLI

> Si estás en Windows, es recomendado usar [WSL](https://docs.microsoft.com/en-us/windows/wsl/install-win10) para ejecutar estos comandos

1. Establece el CLI config url a un localhost clúster

```bash
solana config set --url localhost
```

2. Crear CLI Keypair

Si es tu primer vez usando el Solana Cli, tendrás que generar una nueva keypair:

```bash
solana-keygen new
```

### Iniciar Solana clúster local

Este ejemplo se conecta a un Solana cluster This example connects to a local Solana clúster por defecto.

Iniciar un Solana clúster:
```bash
solana-test-validator
```
> **Nota**: Quiza necesites algún [ajuste de sistema](https://docs.solana.com/running-validator/validator-start#system-tuning) (and restart your computer) para que el validator sea ejecutado

Escuchar los los de la transacción:
```bash
solana logs
```

### Instalar dependencias npm 

```bash
npm install
```

### Crear el programa en cadena

Hay una versión de Rust y una de C del programa en cadena. La que sea creada por último será utilizada en este ejemplo.
last will be the one used when running the example.

```bash
npm run build:program-rust
```

```bash
npm run build:program-c
```

### Lanzar el programa en cadena

```bash
solana program deploy dist/program/helloworld.so
```

### Lanzar el cliente de JavaScript

```bash
npm run start
```

### Resultado esperado

Los valores de la 'public key' van a variar:

```bash
Let's say hello to a Solana account...
Connection to cluster established: http://localhost:8899 { 'feature-set': 2045430982, 'solana-core': '1.7.8' }
Using account AiT1QgeYaK86Lf9kudqKthQPCWwpG8vFA1bAAioBoF4X containing 0.00141872 SOL to pay for fees
Using program Dro9uk45fxMcKWGb1eWALujbTssh6DW8mb4x8x3Eq5h6
Creating account 8MBmHtJvxpKdYhdw6yPpedp6X6y2U9dCpdYaZJdmwV3A to say hello to
Saying hello to 8MBmHtJvxpKdYhdw6yPpedp6X6y2U9dCpdYaZJdmwV3A
8MBmHtJvxpKdYhdw6yPpedp6X6y2U9dCpdYaZJdmwV3A has been greeted 1 times
Success
```

#### ¿No ves el resultado esperado?

- Asegúrate que [hayas iniciado el clúster local](#start-local-solana-cluster),
  [creado el programa en cadena](#build-the-on-chain-program) y [y lanzado el programa al clúster](#deploy-the-on-chain-program).
- Inspecciona los los del programa con `solana logs` para ver adonde fallló.
  - ```bash
    Transaction executed in slot 5621:
    Signature: 4pya5iyvNfAZj9sVWHzByrxdKB84uA5sCxLceBwr9UyuETX2QwnKg56MgBKWSM4breVRzHmpb1EZQXFPPmJnEtsJ
    Status: Error processing Instruction 0: Program failed to complete
    Log Messages:
      Program G5bbS1ipWzqQhekkiCLn6u7Y1jJdnGK85ceSYLx2kKbA invoke [1]
      Program log: Hello World Rust program entrypoint
      Program G5bbS1ipWzqQhekkiCLn6u7Y1jJdnGK85ceSYLx2kKbA consumed 200000 of 200000 compute units
      Program failed to complete: exceeded maximum number of instructions allowed (200000) at instruction #334
      Program G5bbS1ipWzqQhekkiCLn6u7Y1jJdnGK85ceSYLx2kKbA failed: Program failed to complete

### Personalizar el programa

Para personalizar el ejemplo haz cambios a los documentos dentro `/src`.  Si quieres cambiar
cualquier documento dentro `/src/program-rust` or `/src/program-c` tendrás que
[crear el programa en cadena otra vez](#build-the-on-chain-program) y [volver a lanzar el programa](#deploy-the-on-chain-program).

Ahora cuando ejecutes `npm run start`, deberías de ver los cambios.

## Aprende sobre Solana

Mas información sobre como funciona Solana esta disponible en la [Documentación de Solana](https://docs.solana.com/) y todo el código nativo se encuentra en
[github](https://github.com/solana-labs/solana)

¿Tienes alguna pregunta? Visítanos en [Discord](https://discordapp.com/invite/pquxPsq)

## Aprende más sobre el cliente

El cliente en este ejemplo esta escrito en TypeScript usando:
- [Solana web3.js SDK](https://github.com/solana-labs/solana-web3.js)
- [Solana web3 API](https://solana-labs.github.io/solana-web3.js)

### Punto de entrada

El [punto de entrada del cliente](https://github.com/solana-labs/example-helloworld/blob/ad52dc719cdc96d45ad8e308e8759abf4792b667/src/client/main.ts#L13)
hace cinco cosas.

### Establecer una conección con el clúster

El cliente conección con el clúster usando
[`establishConnection`](https://github.com/solana-labs/example-helloworld/blob/ad52dc719cdc96d45ad8e308e8759abf4792b667/src/client/hello_world.ts#L92).

### Establece una cuenta para pagar las transacciones

El cliente se asegura de revisar que exista una cuenta para pagar las transacciones
y crea una en caso que no exista usando
[`establishPayer`](https://github.com/solana-labs/example-helloworld/blob/ad52dc719cdc96d45ad8e308e8759abf4792b667/src/client/hello_world.ts#L102).

### Revisar que el programa helloworld en cadena haya sido lanzado

En [`checkProgram`](https://github.com/solana-labs/example-helloworld/blob/ad52dc719cdc96d45ad8e308e8759abf4792b667/src/client/hello_world.ts#L144),
el cliente carga la keypair del programa lanzado de `./dist/program/helloworld-keypair.json` y usa
la public key para la keypair para extraer el 'program account'. En caso que el programa no exista, el cliente se detiene
con un error. Si el programa existe creara una nueva cuentá y el programa será asignado como el dueño
para guardar el estado del programa (número de veces que 'hello' ha sido procesado).

### Enviar una transacción "Hello" al programa en cadena

El cliente crea y manda una transaccion de "Hello" al programa usando 
[`sayHello`](https://github.com/solana-labs/example-helloworld/blob/ad52dc719cdc96d45ad8e308e8759abf4792b667/src/client/hello_world.ts#L209).
La transaccion contiene un instruccion muy simple que lleva principalmente
la 'public key' de la cuenta de programa helloworld a la que va a llamar y la cuenta del "greeter"
a la que el cliente le quiere decir "Hello".

### Consulta la cuenta de Solana usada en la transacción de "Hello"

Cada vez que el cliente le dice "Hello" a una cuenta, el programa incrementa
in contador numeríco en el "greeter" en la data en el cuenta.  El cliente consulta el
"greeter" en la data en la cuenta el numero actual de veces que
ha sido llamada usando
[`reportGreetings`](https://github.com/solana-labs/example-helloworld/blob/ad52dc719cdc96d45ad8e308e8759abf4792b667/src/client/hello_world.ts#L226).

## Aprender sobre programas en cadena

El [on-chain helloworld program](/src/program-rust/Cargo.toml) es un programa de Rust
compilado en [Berkeley Packet Filter
(BPF)](https://en.wikipedia.org/wiki/Berkeley_Packet_Filter) bytecode and y guardado como
[Executable and Linkable Format (ELF) shared
object](https://en.wikipedia.org/wiki/Executable_and_Linkable_Format).

El programa está escrito con:
- [Solana Rust SDK](https://github.com/solana-labs/solana/tree/master/sdk)

### Programando en Solana

Para aprender mas sobre el modelo de programación de Solana usa como referencia [Programming Model
Overview](https://docs.solana.com/developing/programming-model/overview).

Para aprender mas sobre desarrollando programas en Solana usa como referencia [On-Chain
Programs Overview](https://docs.solana.com/developing/on-chain-programs/overview)

## Apuntando a un clúster público de Solana

Solana mantiene tres clústers públicos:
- `devnet` - Clúster para desarrollar con airdrops activados
- `testnet` - Tour De Sol test Clúster sin airdrops activados
- `mainnet-beta` -  Clúster Principal

Usa el Solana CLI para configurar a que clúster estás contectado.

Para apuntar a `devnet`:
```bash
solana config set --url devnet
```

Para apuntar al clúster local otra vez:
```bash
solana config set --url localhost
```

## Escribiendo el cliente en Rust

Este ejemplo detalla escribiendo el código del cliente en typescript pero el programa del cliente para Solana puede ser escrito en cualquier lenguaje. Para ver el cliente escrito en Rust documentación que lo acompaña visita 
[este repositorio](https://github.com/ezekiiel/simple-solana-program).

## Expande tus habilidades con ejemplos avanzados

Hay mucho que aprender. El siguiente ejemplo demuestra características como errores personalizados, manejo de cuenta anvanzado, serialización de datos, punto de referencia, etc...

- [Ejemplos de programación](https://github.com/solana-labs/solana-program-library/tree/master/examples)
- [Programa del Token](https://github.com/solana-labs/solana-program-library/tree/master/token)
- [Programa para intercambio del Token](https://github.com/solana-labs/solana-program-library/tree/master/token-swap)



