---
---
# XML (Extensible Markup Language)

XML is a markup language designed to store and transport data in a format that is both human-readable and machine-readable. Unlike HTML, which focuses on displaying data, XML focuses on describing and structuring data.

## XML Structure and Syntax

```
┌─────────────────────────────────────────────────────────────┐
│                    XML DOCUMENT STRUCTURE                   │
└─────────────────────────────────────────────────────────────┘

    <?xml version="1.0" encoding="UTF-8"?>  ← XML Declaration
    
    <!-- Root Element (Required - only one) -->
    <bookstore>                              ← Opening Tag
        
        <!-- Child Elements -->
        <book category="fiction">            ← Attribute
            <title lang="en">                ← Nested Element
                The Great Gatsby
            </title>                         ← Closing Tag
            <author>F. Scott Fitzgerald</author>
            <year>1925</year>
            <price currency="USD">10.99</price>
        </book>
        
        <book category="science">
            <title>A Brief History of Time</title>
            <author>Stephen Hawking</author>
            <year>1988</year>
            <price currency="USD">15.99</price>
        </book>
        
    </bookstore>                             ← Root Closing Tag
```

## XML Tree Structure

```
                    bookstore (Root)
                         |
         ┌───────────────┴───────────────┐
         |                               |
       book                            book
    (category="fiction")           (category="science")
         |                               |
    ┌────┼────┬──────┬──────┐      ┌────┼────┬──────┬──────┐
    |    |    |      |      |      |    |    |      |      |
  title author year price  ...   title author year price  ...
```

## XML Syntax Rules

```
┌─────────────────────────────────────────────────────────────┐
│                  XML SYNTAX RULES                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ✓ Must have a root element                                │
│  ✓ Tags must be properly closed                            │
│  ✓ Tags are case-sensitive                                 │
│  ✓ Elements must be properly nested                        │
│  ✓ Attribute values must be in quotes                      │
│  ✓ Special characters must be escaped                      │
│                                                             │
│  CORRECT                    INCORRECT                       │
│  ────────────────────────────────────────                  │
│  <name>John</name>          <name>John                     │
│  <Name>...</Name>           <name>...</Name>  (different)  │
│  <a><b></b></a>             <a><b></a></b>                 │
│  <item id="1"/>             <item id=1>                    │
│  &lt; &gt; &amp;            < > &                          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Example XML Document:**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<students>
    <student id="101">
        <name>Alice Johnson</name>
        <age>20</age>
        <major>Computer Science</major>
        <gpa>3.8</gpa>
    </student>
    <student id="102">
        <name>Bob Smith</name>
        <age>22</age>
        <major>Mathematics</major>
        <gpa>3.5</gpa>
    </student>
</students>
```

# DTD (Document Type Definition)

DTD defines the structure and legal elements of an XML document. It specifies what elements can appear, in what order, and what attributes they can have. DTD acts as a blueprint or contract for XML documents.

## DTD Structure

```
┌─────────────────────────────────────────────────────────────┐
│                    DTD COMPONENTS                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. ELEMENT DECLARATIONS                                    │
│     <!ELEMENT element-name (content-model)>                 │
│                                                             │
│  2. ATTRIBUTE DECLARATIONS                                  │
│     <!ATTLIST element-name attribute-name type default>     │
│                                                             │
│  3. ENTITY DECLARATIONS                                     │
│     <!ENTITY entity-name "entity-value">                    │
│                                                             │
│  4. NOTATION DECLARATIONS                                   │
│     <!NOTATION notation-name SYSTEM "URI">                  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## DTD Declaration Types

```
INTERNAL DTD                      EXTERNAL DTD
────────────────                  ────────────────

<?xml version="1.0"?>            <?xml version="1.0"?>
<!DOCTYPE root [                 <!DOCTYPE root SYSTEM "file.dtd">
  <!ELEMENT root (child)>        <root>
  <!ELEMENT child (#PCDATA)>       <child>Text</child>
]>                               </root>
<root>
  <child>Text</child>            ┌──────────────────┐
</root>                          │   file.dtd       │
                                 ├──────────────────┤
   ↑                             │ <!ELEMENT root   │
   |                             │   (child)>       │
   └─ DTD inside XML             │ <!ELEMENT child  │
                                 │   (#PCDATA)>     │
                                 └──────────────────┘
                                         ↑
                                         |
                                         └─ DTD in separate file
```

## DTD Element Content Models

```
┌─────────────────────────────────────────────────────────────┐
│              DTD CONTENT MODELS                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Symbol  │  Meaning            │  Example                   │
│  ────────┼─────────────────────┼──────────────────────────  │
│  #PCDATA │  Text data          │  <!ELEMENT name (#PCDATA)> │
│  EMPTY   │  No content         │  <!ELEMENT br EMPTY>       │
│  ANY     │  Any content        │  <!ELEMENT div ANY>        │
│  ,       │  Sequence (order)   │  <!ELEMENT book            │
│          │                     │    (title,author,year)>    │
│  |       │  Choice (one of)    │  <!ELEMENT contact         │
│          │                     │    (email|phone)>          │
│  ?       │  Optional (0 or 1)  │  <!ELEMENT person          │
│          │                     │    (name,nickname?)>       │
│  *       │  Zero or more       │  <!ELEMENT list (item*)>   │
│  +       │  One or more        │  <!ELEMENT book            │
│          │                     │    (chapter+)>             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```
## PCDATA in XML

**PCDATA** stands for **Parsed Character Data**. It refers to text content within an XML element that will be parsed by an XML parser. During parsing:

- The parser checks for markup (like nested tags).
    
- Entity references (e.g., `&lt;`, `&gt;`, `&amp;`) are expanded.
    
- Characters like `<`, `>`, and `&` must be escaped (as `&lt;`, `&gt;`, `&amp;`) to avoid being interpreted as markup.
    

PCDATA is used in **Document Type Definitions (DTDs)** to 
specify that an element contains text that should be parsed.

