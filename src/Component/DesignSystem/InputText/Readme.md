# React component ( Input text)

## Usage
add the following imports
```js

import TextField from '.../Component/DesignSystem/InputText'
import { InputMode } from '.../Component/DesignSystem/InputText/types'
```

normal input
```html

<TextField placeholder={'placeholder'} required={false} value={state} onChange={(text: string) => setstate(text)} TitleText={'title'} mode={InputMode.editable} type="InputType.text"/>

```

mode can be :
`InputMode.editable`
`InputMode.readonly`
`InputMode.disabled`

type can be :
`InputType.text`
`InputType.number`

