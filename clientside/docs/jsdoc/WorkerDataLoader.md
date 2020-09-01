# WorkerDataLoader

## Functions

<dl>
<dt><a href="#mirrorYs">mirrorYs(vertexList)</a> ⇒ <code>Array.&lt;float&gt;</code></dt>
<dd><p>Multiplies each point&#39;s Y value by -1</p>
</dd>
<dt><a href="#WorkerDataLoader">WorkerDataLoader(data, loadFunction)</a></dt>
<dd></dd>
<dt><a href="#getCycleObject">getCycleObject(cycle)</a> ⇒ <code>Array.&lt;Object&gt;</code></dt>
<dd><p>Get cycle object.</p>
</dd>
<dt><a href="#getCyclesNumber">getCyclesNumber()</a> ⇒ <code>integer</code></dt>
<dd><p>Get cycles number.</p>
</dd>
<dt><a href="#releaseCycleMemory">releaseCycleMemory(cycle)</a></dt>
<dd><p>Remove specific cycles data from memory.</p>
</dd>
<dt><a href="#getInfoObject">getInfoObject()</a> ⇒ <code>Object</code></dt>
<dd><p>Get info object.</p>
</dd>
<dt><a href="#checkForIcon">checkForIcon(entity)</a></dt>
<dd><p>Push given entity to <code>WorkerDataLoader.entitiesWithIcon</code> 
if entity has icon.</p>
</dd>
<dt><a href="#createBaseCycle">createBaseCycle(data, loadFunction)</a></dt>
<dd><p>Create base cycle</p>
</dd>
<dt><a href="#fillCycle">fillCycle(cycle)</a></dt>
<dd><p>Fill given cycle</p>
</dd>
<dt><a href="#fillCycles">fillCycles(data, loadFunction)</a></dt>
<dd><p>Fill cycles</p>
</dd>
<dt><a href="#postCycleAfterBake">postCycleAfterBake(cycle, data)</a></dt>
<dd><p>Post given cycles Historian.</p>
</dd>
<dt><a href="#fillHistoryWithCycleObject">fillHistoryWithCycleObject(historyManager, cycleObject, cycle)</a> ⇒ <code>Object</code></dt>
<dd><p>Fill history with cycle object.</p>
</dd>
<dt><a href="#fillHistoryWithObject">fillHistoryWithObject(historyManager, objectList)</a> ⇒ <code>Object</code></dt>
<dd><p>Fill history with object.</p>
</dd>
<dt><a href="#fillHistoryWithObjectIcons">fillHistoryWithObjectIcons(historyManager, entities)</a></dt>
<dd><p>Fill history with object icons.</p>
</dd>
<dt><a href="#consturctor">consturctor(data, loadFunction)</a></dt>
<dd></dd>
</dl>

<a name="mirrorYs"></a>

## mirrorYs(vertexList) ⇒ <code>Array.&lt;float&gt;</code>
Multiplies each point's Y value by -1

**Kind**: global function  
**Returns**: <code>Array.&lt;float&gt;</code> - mirrored vertex list  

| Param | Type | Description |
| --- | --- | --- |
| vertexList | <code>Array.&lt;float&gt;</code> | vertex list |

<a name="WorkerDataLoader"></a>

## WorkerDataLoader(data, loadFunction)
**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | data object |
| loadFunction | <code>function</code> | load function |

<a name="getCycleObject"></a>

## getCycleObject(cycle) ⇒ <code>Array.&lt;Object&gt;</code>
Get cycle object.

**Kind**: global function  
**Returns**: <code>Array.&lt;Object&gt;</code> - cycle object  

| Param | Type | Description |
| --- | --- | --- |
| cycle | <code>integer</code> | cycle number |

<a name="getCyclesNumber"></a>

## getCyclesNumber() ⇒ <code>integer</code>
Get cycles number.

**Kind**: global function  
**Returns**: <code>integer</code> - cycles number  
<a name="releaseCycleMemory"></a>

## releaseCycleMemory(cycle)
Remove specific cycles data from memory.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| cycle | <code>integer</code> | cycle number |

<a name="getInfoObject"></a>

## getInfoObject() ⇒ <code>Object</code>
Get info object.

**Kind**: global function  
**Returns**: <code>Object</code> - info object  
<a name="checkForIcon"></a>

## checkForIcon(entity)
Push given entity to ``WorkerDataLoader.entitiesWithIcon`` if entity has icon.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| entity | <code>Object</code> | entity object |

<a name="createBaseCycle"></a>

## createBaseCycle(data, loadFunction)
Create base cycle

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | data object |
| loadFunction | <code>function</code> | load function |

<a name="fillCycle"></a>

## fillCycle(cycle)
Fill given cycle

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| cycle | <code>Object</code> | changes of the cycle |

<a name="fillCycles"></a>

## fillCycles(data, loadFunction)
Fill cycles

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | data object |
| loadFunction | <code>function</code> | load function |

<a name="postCycleAfterBake"></a>

## postCycleAfterBake(cycle, data)
Post given cycles Historian.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| cycle | <code>integer</code> | cycle number |
| data | <code>Object</code> | cycle data |

<a name="fillHistoryWithCycleObject"></a>

## fillHistoryWithCycleObject(historyManager, cycleObject, cycle) ⇒ <code>Object</code>
Fill history with cycle object.

**Kind**: global function  
**Returns**: <code>Object</code> - object of ``HistoryManager``  

| Param | Type | Description |
| --- | --- | --- |
| historyManager | <code>Object</code> | object of ``HistoryManager`` |
| cycleObject | <code>Object</code> | cycle object |
| cycle | <code>integer</code> | cycle number |

<a name="fillHistoryWithObject"></a>

## fillHistoryWithObject(historyManager, objectList) ⇒ <code>Object</code>
Fill history with object.

**Kind**: global function  
**Returns**: <code>Object</code> - object of ``HistoryManager``  

| Param | Type | Description |
| --- | --- | --- |
| historyManager | <code>Object</code> | object of ``HistoryManager`` |
| objectList | <code>Object</code> | object of objects |

<a name="fillHistoryWithObjectIcons"></a>

## fillHistoryWithObjectIcons(historyManager, entities)
Fill history with object icons.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| historyManager | <code>Object</code> | object of ``HistoryManager`` |
| entities | <code>Array.&lt;Object&gt;</code> | array of entity objects |

<a name="consturctor"></a>

## consturctor(data, loadFunction)
**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | data |
| loadFunction | <code>function</code> | load function |



