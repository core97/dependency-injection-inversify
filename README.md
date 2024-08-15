
# 💉 Inyección de dependencias

En este proyecto veremos como gestionar e inyectar dependencias usando el paquete de [inversify](https://www.npmjs.com/package/inversify).

## ¿Qué es?

Es un patrón de diseño que se utiliza para gestionar las dependencias entre los objetos en un programa. Una "dependencia" es básicamente cualquier objeto que una clase necesita para funcionar correctamente. En lugar de que la clase cree esas dependencias por sí misma, se las pasamos desde el exterior, típicamente a través del constructor de la clase, un método o un atributo.

En otras palabras, en lugar de que un objeto sea responsable de crear sus propias dependencias, las recibe desde el exterior, lo que facilita la gestión y el control de esas dependencias.

### Ejemplo simple sin inyección de dependencias

```typescript
class Motor {
    arrancar(): void {
        console.log("El motor ha arrancado");
    }
}

class Coche {
    private motor: Motor;

    constructor() {
        this.motor = new Motor();  // El coche crea su propia dependencia
    }

    conducir(): void {
        this.motor.arrancar();
    }
}

// Uso
const coche = new Coche();
coche.conducir();
```

### Ejemplo simple con inyección de dependencias

```typescript
class Motor {
    arrancar(): void {
        console.log("El motor ha arrancado");
    }
}

class Coche {
    private motor: Motor;

    // Inyecta la dependencia a través del constructor
    constructor(motor: Motor) {
        this.motor = motor;
    }

    conducir(): void {
        this.motor.arrancar();
    }
}

// Uso de DI
const motor = new Motor();
const coche = new Coche(motor);  // Inyección de dependencias
coche.conducir();
```

## Ventajas de la inyección de dependencias

- Reducción del acoplamiento: Las clases no están acopladas a implementaciones específicas.

- Facilita el testing: Podemos reemplazar Motor por una versión simulada en pruebas.

- Mejora la mantenibilidad: Código más limpio y modular.

- Promueve la reutilización: Las clases se pueden reutilizar en diferentes contextos.

## Relación entre DI y los principios SOLID

- **SRP (Single Responsibility Principle)**: Las clases Coche y Motor tienen responsabilidades claras y separadas.

- **OCP (Open/Closed Principle)**: Coche puede aceptar diferentes implementaciones de Motor sin modificar su código.

- **LSP (Liskov Substitution Principle)**: Se pueden crear diferentes tipos de motores (Electrico, Gasolina, etc.) y Coche funcionará con cualquiera que implemente la interfaz Motor.

- **ISP (Interface Segregation Principle)**: Si Motor fuera una interfaz, Coche dependería solo de los métodos que realmente necesita.

- **DIP (Dependency Inversion Principle)**: Coche depende de una abstracción (Motor), no de una implementación concreta.

## Clean Architecture con DI

En una arquitectura limpia, podrías tener diferentes capas como **Entidad**, **Caso de Uso** o **Aplicación**, **Interfaz**, e **Infraestructura**. DI permite desacoplar estas capas.

### Ejemplo aplicando Clean Architecture

- Desacoplamiento de capas: La capa de lógica de negocio (CrearUsuario) no sabe ni le importa cómo se implementa UsuarioRepositorio.

- Inversión de dependencias: La capa de "infraestructura" (UsuarioRepositorioMemoria) depende de una abstracción (UsuarioRepositorio), no al revés.

- Flexibilidad y extensibilidad: Puedes cambiar la implementación del repositorio (por ejemplo, UsuarioRepositorioDB) sin afectar la lógica de negocio.

- Pruebas unitarias: Puedes crear una implementación mock de UsuarioRepositorio para pruebas.

```typescript
// Entidad
class Usuario {
    constructor(public nombre: string, public edad: number) {}
}

// Caso de Uso (Lógica de negocio)
class CrearUsuario {
    constructor(private repositorio: UsuarioRepositorio) {}

    ejecutar(nombre: string, edad: number): Usuario {
        const usuario = new Usuario(nombre, edad);
        return this.repositorio.guardar(usuario);
    }
}

// Interfaz (Abstracción)
interface UsuarioRepositorio {
    guardar(usuario: Usuario): Usuario;
}

// Infraestructura (Implementación concreta)
class UsuarioRepositorioMemoria implements UsuarioRepositorio {
    private usuarios: Usuario[] = [];

    guardar(usuario: Usuario): Usuario {
        this.usuarios.push(usuario);
        return usuario;
    }
}

// Configuración (Inyección de dependencias)
const repositorio: UsuarioRepositorio = new UsuarioRepositorioMemoria();
const casoDeUso: CrearUsuario = new CrearUsuario(repositorio);

// Uso
const nuevoUsuario = casoDeUso.ejecutar("Juan", 30);
console.log(nuevoUsuario);

```
