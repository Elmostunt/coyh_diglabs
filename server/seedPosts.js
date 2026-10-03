// server/seedPosts.js — artículos históricos del sitio.
// Se cargan automáticamente en Datastore solo si la colección está vacía;
// después de eso se administran desde /admin.
module.exports = [
  {
    slug: 'cuanto-cuesta-pagina-web-coyhaique',
    title: '¿Cuánto cuesta una página web en Coyhaique?',
    summary: 'Respuesta honesta para empresas de Aysén: rangos reales, qué incluye cada nivel y cómo evitar pagar por cosas que no necesitas.',
    category: 'Desarrollo Web',
    author: 'Guillermo Cárcamo',
    status: 'published',
    publishedAt: '2026-10-03T12:00:00.000Z',
    content: `Es la pregunta que más nos hacen empresas de Coyhaique y la región de Aysén. Y la respuesta honesta es: depende de qué necesita tu negocio, no de cuántas páginas tenga el sitio.

## Los tres niveles típicos

### 1. Sitio corporativo (desde ~$2.000 USD)

Para presentar tu empresa, tus servicios y recibir contactos. Incluye diseño responsive, formulario de contacto, integración con WhatsApp, SEO básico y analytics. Es el punto de partida correcto para la mayoría de las PYMEs.

### 2. Sitio con herramientas de negocio

Cuando además necesitas que la web trabaje: reservas online, catálogo con pedidos, menú digital, cotizador. Aquí el precio sube porque ya no es solo diseño — es software.

### 3. Sistema web propio

Si lo que necesitas es gestionar tu operación (clientes, inventario, órdenes de trabajo), ya no hablamos de una página web sino de un sistema. Es otra categoría de proyecto, con otro presupuesto.

## ¿Por qué varían tanto los precios en el mercado?

- Hay quien vende plantillas genéricas a precio de desarrollo a medida
- Hay quien cobra mensualidades de por vida por algo que podrías tener propio
- Hay proyectos donde el 80% del costo es diseño y el 20% funcionalidad — o al revés

## Nuestra recomendación para empresas de Aysén

1. Define primero qué problema debe resolver la web (¿generar contactos? ¿recibir reservas? ¿vender?)
2. Pide que te expliquen qué incluye y qué no, en lenguaje simple
3. Asegúrate de que el dominio y el contenido queden a tu nombre
4. Desconfía de precios sin conversación previa: cotizar sin entender el negocio es adivinar

En Sur Digital Labs la evaluación inicial es gratis y sin compromiso. Te decimos qué necesitas realmente — incluso si es menos de lo que pensabas comprar.

**Conversemos:** [Cuéntanos tu caso](/contacto)`,
  },
  {
    slug: 'digitalizar-empresa-aysen',
    title: 'Cómo digitalizar una empresa en Aysén (sin morir en el intento)',
    summary: 'Guía práctica para PYMEs de la región: por dónde partir, qué automatizar primero y qué errores evitar.',
    category: 'Digitalización',
    author: 'Guillermo Cárcamo',
    status: 'published',
    publishedAt: '2026-10-02T12:00:00.000Z',
    content: `"Digitalizar" suena a proyecto gigante. En la práctica, para una PYME de Aysén casi siempre parte por algo muy concreto: dejar de hacer a mano una tarea que se repite todos los días.

## Señales de que es el momento

- La información del negocio vive en planillas que solo una persona entiende
- Las reservas o pedidos llegan por WhatsApp, correo y teléfono, y se pierden
- Los reportes se arman copiando y pegando entre archivos
- Contratar más gente para "ordenar papeles" empieza a parecer la única salida

## Por dónde partir (en orden)

### 1. El proceso que más duele

No se digitaliza todo de una vez. Se elige el proceso que más tiempo pierde o más errores genera, y se parte por ahí. Un resultado visible en semanas genera confianza para lo que sigue.

### 2. Centralizar la información

Antes de pensar en sistemas sofisticados: que los datos del negocio estén en un solo lugar, actualizados y accesibles. Muchas veces esto solo ya cambia la operación.

### 3. Automatizar lo repetitivo

Reportes que se arman solos, notificaciones automáticas, información que fluye entre sistemas sin copiar y pegar. Es donde está el mayor retorno por peso invertido.

### 4. Medir

Con los datos ordenados, un dashboard simple responde la pregunta que todo dueño se hace: ¿cómo va realmente el negocio?

## Errores comunes que vemos en la región

- Comprar un software genérico "porque lo usa todo el mundo" y terminar adaptando el negocio a la herramienta
- Partir por lo más grande y caro en vez de lo más urgente
- No considerar quién va a usar el sistema día a día
- Depender de un proveedor lejano que no entiende cómo opera una empresa en la Patagonia

## La ventaja de hacerlo desde aquí

Trabajar con un equipo de Aysén significa hablar directo con quien diseña y construye la solución, en el mismo huso horario, entendiendo el contexto regional — y con la misma tecnología que usan las grandes empresas.

**¿Tu empresa está en este punto?** [Conversemos sobre tu caso](/contacto) — la evaluación inicial es gratis.`,
  },
  {
    slug: 'migrar-de-excel-a-un-sistema',
    title: 'Migrar de Excel a un sistema real en 30 días',
    summary: 'Una guía práctica para reemplazar hojas de cálculo con una aplicación que el equipo puede operar sin intermediarios.',
    category: 'Automatización',
    author: 'Guillermo Cárcamo',
    status: 'published',
    publishedAt: '2026-06-01T12:00:00.000Z',
    video: 'https://www.youtube.com/@guillermocarcamo8219',
    videoTitle: 'Ver más sobre automatización en mi canal',
    content: `Las hojas de cálculo son herramientas valiosas, pero llegan a un punto donde se convierten en un cuello de botella:

- Errores de entrada manual
- Versiones desactualizadas circulando
- Imposible controlar quién cambió qué
- No escala para múltiples usuarios simultáneos

## ¿Cuál es el verdadero costo de mantener Excel?

Cada persona que dedica 2 horas semanales a tareas manuales son ~100 horas anuales. A un salario de $25/hora, eso es $2.500 al año, solo en una persona.

## Un sistema real resuelve esto

1. Entrada de datos única y validada
2. Histórico de cambios automático
3. Múltiples usuarios sin conflictos
4. Reportes en tiempo real
5. Integraciones con otros sistemas

## Nuestro proceso

- Semana 1-2: mapeo del proceso actual y diseño de la solución
- Semana 2-3: desarrollo del backend y frontend funcional
- Semana 3-4: testing, documentación y capacitación

**Comienza hoy:** [Ver servicios de automatización](/software)`,
  },
  {
    slug: 'software-a-medida-vs-template',
    title: 'Software a medida vs. template: ¿por qué cuesta más?',
    summary: 'Explicación honesta sobre por qué un sistema personalizado tiene un precio diferente a un template genérico.',
    category: 'Software',
    author: 'Guillermo Cárcamo',
    status: 'published',
    publishedAt: '2026-05-28T12:00:00.000Z',
    video: 'https://www.youtube.com/@guillermocarcamo8219',
    videoTitle: 'Ver mi canal de YouTube',
    content: `La pregunta es válida: "¿Por qué un software a medida cuesta el triple que un template de Shopify?"

**La respuesta corta:** porque son cosas completamente diferentes.

## Template

- Solución lista para usar
- Sin personalización
- Funciona para el 80% de los casos
- Pero los casos especiales requieren trucos o plugins costosos
- El proveedor controla los datos

## Software a medida

- Construido para tu proceso específico
- Escalable conforme creces
- Datos completamente tuyos
- Sin sorpresas de precio futuro
- Mantenible y documentado

## Un ejemplo real

Una tienda online típica necesita catálogo, carrito, pagos en línea y reportes de ventas. Un template cubre todo esto. Pero si además necesitas:

- Integración con tu proveedor de inventario
- Generar facturas electrónicas automáticamente
- Análisis predictivo de demanda
- Sistema de comisiones para vendedores
- Punto de venta en tienda física

...cada una de esas cosas requiere plugins adicionales, personalizaciones complejas, o simplemente "no es posible". Con software a medida, todo eso es posible porque está diseñado para tu negocio.

## ¿Cuál elegir?

- **Template:** si tu proceso es estándar y no cambia
- **A medida:** si tu negocio es único o quieres diferenciarte

Muchas empresas comienzan con un template y después necesitan migrar cuando crecen. Es más caro que hacerlo bien desde el inicio.

**Hablemos de tu caso:** [Contáctanos](/contacto)`,
  },
  {
    slug: 'primeros-pasos-data-engineering',
    title: 'Primeros pasos en data engineering: pipelines que funcionan',
    summary: 'Una introducción práctica a construir pipelines de datos confiables sin usar herramientas complejas.',
    category: 'Datos & IA',
    author: 'Guillermo Cárcamo',
    status: 'published',
    publishedAt: '2026-05-20T12:00:00.000Z',
    video: 'https://www.youtube.com/@guillermocarcamo8219',
    videoTitle: 'Ver tutoriales en mi canal',
    content: `Cuando hablamos de "data engineering", muchas empresas piensan que necesitan Apache Spark, Kafka y un equipo de 5 personas. En la realidad, el 80% de los casos se resuelven con Python + un scheduler + una base de datos.

## ¿Qué es un pipeline de datos?

Un flujo automatizado que:

1. Extrae datos de una fuente (API, base de datos, CSV)
2. Los transforma (limpia, valida, enriquece)
3. Los carga en un destino (data warehouse, BI, caché)

Todo sin intervención manual.

## Extracción

\`\`\`python
import requests
respuesta = requests.get('https://api.ejemplo.com/datos')
datos = respuesta.json()
\`\`\`

## Transformación

\`\`\`python
datos_limpios = [d for d in datos if d['estado'] == 'activo']
datos_procesados = [{'id': d['id'], 'monto': float(d['monto'])} for d in datos_limpios]
\`\`\`

## Carga

\`\`\`python
from sqlalchemy import create_engine
engine = create_engine('postgresql://...')
df.to_sql('ventas', engine, if_exists='append')
\`\`\`

## Programación

Usa cron o Airflow para ejecutarlo cada día:

\`\`\`bash
0 2 * * * python /app/pipeline.py
\`\`\`

## Errores comunes

- No validar datos en la transformación (basura entra, basura sale)
- No versionar el pipeline
- No registrar qué falló
- Correr todo en producción sin pruebas

## Empezar con confianza

1. Escribe tu pipeline localmente
2. Pruébalo con datos de prueba
3. Despliégalo en un scheduler
4. Monitorea logs y alertas
5. Itera rápido cuando hay cambios

**Aprende más:** [Ver servicios de datos](/datos)`,
  },
];
