/**
 * ✅ CONTEXTO GENERAL (Zoneless + Karma/Jasmine)
 * - Este archivo define una *suite de tests* para el componente `App` usando Jasmine (describe/it)
 *   y el *TestBed* de Angular para montar el componente en un entorno de pruebas del navegador (Karma).
 * - "Zoneless" significa que NO usamos zone.js; por eso proveemos `provideZonelessChangeDetection()`
 *   y disparamos cambios explícitamente con `fixture.detectChanges()` si queremos reflejarlos en el DOM.
 *
 * 🧭 FLUJO DE EJECUCIÓN RESUMIDO
 * 1) `describe('App', ...)`: Agrupa todos los tests del componente App.
 * 2) `beforeEach(async ...)`:
 *    - Configura el TestBed (módulo de pruebas) e importa `App`.
 *    - Registra `provideZonelessChangeDetection()` para trabajar sin Zone.
 *    - Compila componentes y crea el `fixture` (wrapper del componente).
 *    - Extrae el `compiled` (HTMLElement) para consultar el DOM renderizado.
 * 3) `it(...)`: Cada test accede a `fixture`/`compiled` preparados en el beforeEach.
 *    - Si el test necesita ver cambios en el DOM por bindings, debe llamar a `fixture.detectChanges()`.
 */

import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  /**
   * `fixture`: "envoltorio" del componente bajo prueba.
   * - Contiene la instancia del componente (`fixture.componentInstance`)
   * - Gestiona el ciclo de detección de cambios (`fixture.detectChanges()`)
   * - Expone el elemento raíz del componente (`fixture.nativeElement`) para consultar el DOM.
   */
  let fixture: ComponentFixture<App>;

  /**
   * `compiled`: referencia al elemento HTML raíz del componente ya creado.
   * - Se usa para hacer aserciones sobre el DOM (querySelector, textContent, etc.).
   * - Importante: si el test depende de bindings actualizados, hay que llamar antes a `fixture.detectChanges()`.
   */
  let compiled: HTMLElement;

  beforeEach(async () => {
    /**
     * TestBed.configureTestingModule:
     * - Crea un "módulo de pruebas" temporal donde declaramos/importamos el componente a testear.
     * - `imports: [App]`: como App es standalone, se importa directamente.
     * - `providers: [provideZonelessChangeDetection()]`: habilita cambio de detección sin zone.js.
     */
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents(); // Compila plantillas y estilos del componente.

    /**
     * Creamos el `fixture` del componente App:
     * - Instancia el componente y su vista asociada (aún sin disparar detección de cambios).
     */
    fixture = TestBed.createComponent(App);

    /**
     * `compiled` apunta al elemento raíz (HTMLElement) de la vista del componente.
     * - Útil para consultar nodos del DOM con querySelector, etc.
     */
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create the app', () => {
    /**
     * Obtenemos la instancia del componente (clase TypeScript).
     * - Aquí verificamos simplemente que el componente se haya creado.
     */
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('Shold be 3', () => {
    /**
     * Test de ejemplo (AAA pattern: Arrange, Act, Assert).
     * - No interactúa con Angular; muestra el estilo de estructurar pruebas unitarias.
     */
    // Arrange
    const num1 = 1;
    const num2 = 2;

    // Act
    const result = num1 + num2;

    // Assert
    expect(result).toBe(3);
  });

  it("should have the 'zoneless-calculator' title", () => {
    /**
     * Verificamos un valor expuesto por la clase del componente.
     * - NOTA: si `title` es un *signal*, se lee como función: `title()`.
     *   Este test asume el acceso correcto en tu implementación actual.
     */
    const app = fixture.componentInstance;
    expect(app.title()).toEqual('zoneless-calculator');
    // Si alguna vez `title` dejara de ser signal y fuera string, sería: expect(app.title).toEqual('...')
  });

  it('should render router-outlet', () => {
    /**
     * Verificamos que en el DOM exista <router-outlet>.
     * - Si necesitáramos comprobar contenido que depende de bindings o del ciclo de cambio:
     *   llamar a `fixture.detectChanges()` antes de leer el DOM.
     * - Para la mera existencia del tag colocado en la plantilla, suele bastar con la creación.
     */
    expect(compiled.querySelector('router-outlet')).not.toBeNull();
  });

  it('should render router-outlet wrapped with css classes', () => {
    const divElement = compiled.querySelector('div');
    const mustHaveClasses =
      'min-w-screen min-h-screen bg-slate-600 flex items-center justify-center px-5 py-5'.split(
        ' '
      );
    expect(divElement).not.toBeNull();

    const divClasses = divElement?.classList.value.split(' ');
    mustHaveClasses.forEach((className) => {
      expect(divClasses).toContain(className);
    });
  });

  it('should render router-outlet wrapped with css classes', () => {
    /**
     * OBJETIVO DEL TEST
     * - Verificar que el <router-outlet> está envuelto por un <div> que aplica
     *   una serie de clases CSS (Tailwind) necesarias para el layout global
     *   (pantalla completa, centrado, padding, fondo, etc.).
     *
     * MOTIVO
     * - Estas clases garantizan que la app ocupe toda la pantalla y centre su contenido.
     * - Si alguien elimina o cambia alguna clase clave, el test fallará y avisará del impacto visual.
     */

    /**
     * 1) Obtenemos el primer <div> de la plantilla raíz.
     *    Este <div> debería ser el contenedor que envuelve al <router-outlet>.
     *    Nota: si el template cambia y el contenedor no es el primer <div>, habrá que ajustar el selector.
     */
    const divElement = compiled.querySelector('div');

    /**
     * 2) Definimos el conjunto MÍNIMO de clases que DEBEN estar presentes.
     *    - Usamos una cadena separada por espacios y la convertimos en array con split(' ').
     *    - Esto facilita mantener la lista y leerla.
     */
    const mustHaveClasses =
      'min-w-screen min-h-screen bg-slate-600 flex items-center justify-center px-5 py-5'.split(
        ' '
      );

    /**
     * 3) Aserción de existencia del contenedor.
     *    - Antes de inspeccionar clases, comprobamos que el <div> realmente existe.
     */
    expect(divElement).not.toBeNull();

    /*
      //* OJO:
      //* Esta forma de comprobar las clases persentes en el div puede dar problemas si se añaden clases nuevas:
      divElement?.classList.forEach((className) => {
        expect(mustHaveClasses).toContain(className);
      });
    */

    /**
     * 4) Obtenemos las clases actuales del <div> como array de strings.
     *    - Usamos `classList.value` para obtener el string completo y lo partimos por espacios.
     *    - Esta aproximación es más estable que iterar classList directamente si luego queremos usar Array.prototype.includes.
     */
    const divClasses = divElement?.classList.value.split(' ');

    /**
     * 5) Comprobamos que TODAS las clases requeridas están presentes en el contenedor.
     *    - Recorremos mustHaveClasses y exigimos que cada una esté en las clases del <div>.
     *    - Ventaja: si se añaden clases NUEVAS al <div>, este test no falla (solo exige las mínimas).
     *    - Así evitamos la versión comentada que era “demasiado estricta” (comparaba todas las existentes contra la lista).
     */
    mustHaveClasses.forEach((className) => {
      expect(divClasses).toContain(className);
    });
  });
});
