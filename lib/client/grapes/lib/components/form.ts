const isPath = require('is-svg-path')

export const typeForm = 'form'
export const typeInput = 'input'
export const typeTextarea = 'textarea'
export const typeSelect = 'select'
export const typeCheckbox = 'checkbox'
export const typeRadio = 'radio'
export const typeButton = 'button'
export const typeLabel = 'label'
export const typeOption = 'option'
export const svgImage = 'svg'

// const pathLogo = 'M8.63867 8.97461H2.91602V15H0.445312V0.78125H9.47852V2.77344H2.91602V7.00195H8.63867V8.97461Z'
// const pathTailblocks = 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5'

const fixAppearanceStyle = '-webkit-appearance: auto; -moz-appearance: none; appearance: auto;'

export function loadFormComponents(editor: {
  DomComponents: any
  TraitManager: any
  Commands: any
}): void {
  const domc = editor.DomComponents

  const idTrait = {
    name: 'id',
  }

  const forTrait = {
    name: 'for',
  }

  const nameTrait = {
    name: 'name',
  }

  const placeholderTrait = {
    name: 'placeholder',
  }

  const valueTrait = {
    name: 'value',
  }

  const requiredTrait = {
    type: 'checkbox',
    name: 'required',
  }

  const checkedTrait = {
    type: 'checkbox',
    name: 'checked',
  }

  domc.addType(typeForm, {
    isComponent: (el: { tagName: string }) => el.tagName == 'FORM',

    model: {
      defaults: {
        tagName: 'form',
        droppable: ':not(form)',
        draggable: ':not(form)',
        attributes: { method: 'get' },
        traits: [
          {
            type: 'select',
            name: 'method',
            options: [
              { value: 'get', name: 'GET' },
              { value: 'post', name: 'POST' },
            ],
          },
          {
            name: 'action',
            placeholder: 'Insert URL',
          },
          {
            type: 'form-next',
            name: 'form',
            label: 'New form',
          },
        ],
      },
    },

    view: {
      events: {
        submit: (e: { preventDefault: () => any }) => e.preventDefault(),
      },
    },
  })

  // INPUT
  domc.addType(typeInput, {
    isComponent: (el: { tagName: string }) => el.tagName == 'INPUT',

    model: {
      defaults: {
        tagName: 'input',
        draggable: 'form, form *',
        droppable: false,
        highlightable: false,
        attributes: { type: 'text' },
        traits: [
          nameTrait,
          placeholderTrait,
          {
            type: 'select',
            name: 'type',
            options: [
              { value: 'text' },
              { value: 'email' },
              { value: 'password' },
              { value: 'number' },
            ],
          },
          requiredTrait,
        ],
      },
    },

    extendFnView: ['updateAttributes'],
    view: {
      updateAttributes() {
        this.el.setAttribute('autocomplete', 'off')
      },
    },
  })

  // TEXTAREA
  domc.addType(typeTextarea, {
    extend: typeInput,
    isComponent: (el: { tagName: string }) => el.tagName == 'TEXTAREA',

    model: {
      defaults: {
        tagName: 'textarea',
        attributes: {},
        traits: [nameTrait, placeholderTrait, requiredTrait],
      },
    },
  })

  // OPTION
  domc.addType(typeOption, {
    isComponent: (el: { tagName: string }) => el.tagName == 'OPTION',

    model: {
      defaults: {
        tagName: 'option',
        layerable: false,
        droppable: false,
        draggable: false,
        highlightable: false,
      },
    },
  })

  const createOption = (value: string, name: string) => ({
    type: typeOption,
    components: name,
    attributes: { value },
  })

  // SELECT
  domc.addType(typeSelect, {
    extend: typeInput,
    isComponent: (el: { tagName: string }) => el.tagName == 'SELECT',

    model: {
      defaults: {
        tagName: 'select',
        components: [createOption('opt1', 'Option 1'), createOption('opt2', 'Option 2')],
        traits: [
          nameTrait,
          {
            name: 'options',
            type: 'select-options',
          },
          requiredTrait,
        ],
      },
    },

    view: {
      events: {
        mousedown: (e: { preventDefault: () => any }) => e.preventDefault(),
      },
    },
  })

  // CHECKBOX
  domc.addType(typeCheckbox, {
    extend: typeInput,
    isComponent: (el: { tagName: string; type: string }) =>
      el.tagName == 'INPUT' && el.type == 'checkbox',

    model: {
      defaults: {
        copyable: false,
        attributes: { type: 'checkbox' },
        traits: [idTrait, nameTrait, valueTrait, requiredTrait, checkedTrait],
      },
    },

    view: {
      events: {
        click: (e: { preventDefault: () => any }) => e.preventDefault(),
      },

      init() {
        this.listenTo(this.model, 'change:attributes:checked', this.handleChecked)
      },

      handleChecked() {
        this.el.checked = !!this.model.get('attributes').checked
      },
    },
  })

  // RADIO
  domc.addType(typeRadio, {
    extend: typeCheckbox,
    isComponent: (el: { tagName: string; type: string }) =>
      el.tagName == 'INPUT' && el.type == 'radio',

    model: {
      defaults: {
        attributes: { type: 'radio' },
      },
    },
  })

  domc.addType(typeButton, {
    extend: typeInput,
    isComponent: (el: { tagName: string }) => el.tagName == 'BUTTON',

    model: {
      defaults: {
        tagName: 'button',
        attributes: { type: 'button' },
        traits: [
          {
            name: 'text',
            changeProp: true,
          },
          {
            type: 'button-next',
            name: 'button',
            label: 'New button',
          },
        ],
      },

      init() {
        const comps = this.components()
        const tChild = comps.length === 1 && comps.models[0]
        const chCnt = (tChild && tChild.is('textnode') && tChild.get('content')) || ''
        const text = chCnt || this.get('text')
        this.set({ text })
        this.on('change:text', this.__onTextChange)
        text !== chCnt && this.__onTextChange()
      },

      __onTextChange() {
        this.components(this.get('text'))
      },
    },

    view: {
      events: {
        click: (e: { preventDefault: () => any }) => e.preventDefault(),
      },
    },
  })

  // LABEL
  domc.addType(typeLabel, {
    extend: 'text',
    isComponent: (el: { tagName: string }) => el.tagName == 'LABEL',

    model: {
      defaults: {
        tagName: 'label',
        components: 'Label',
        traits: [forTrait],
      },
    },
  })

  // SVG
  domc.addType(svgImage, {
    model: {
      defaults: {
        tagName: 'svg',
        components: 'Svg',
        traits: [
          {
            name: 'viewBox',
          },
          {
            name: 'stroke',
          },
          {
            type: 'svg-next',
            name: 'svg',
            label: 'Path',
          },
        ],
      },
    },
  })

  domc.addType('link', {
    model: {
      defaults: {
        traits: [
          {
            type: 'href-next',
            name: 'href',
            label: 'New href',
          },
        ],
      },
    },
  })

  const trtm = editor.TraitManager

  trtm.addType('href-next', {
    noLabel: true,

    createInput() {
      const el = document.createElement('div')
      el.style.backgroundColor = 'white'

      el.innerHTML = `
        <select class="href-next__type" style="background-color: #f1f1f1; margin-bottom: 10px; ${fixAppearanceStyle}">
          <option value="url">URL</option>
          <option value="email">Email</option>
        </select>
        <div class="href-next__url-inputs" style="background-color: #f1f1f1; margin-bottom: 10px;">
          <input class="href-next__url" placeholder="Insert URL"/>
        </div>
        <div class="href-next__email-inputs" style="background-color: #f1f1f1;">
          <input class="href-next__email" placeholder="Insert email"/>
        </div>
        <div class="href-next__newtab-inputs">
          <input style="width: auto; ${fixAppearanceStyle}" class="href-next__newtab" type="checkbox">
          <label> Open in "New Tab"</label>
        </div>
      `

      const inputsUrl = <HTMLElement>el.querySelector('.href-next__url-inputs')
      const inputsEmail = <HTMLElement>el.querySelector('.href-next__email-inputs')
      const inputType = <HTMLElement>el.querySelector('.href-next__type')
      const inputNewTab = <HTMLElement>el.querySelector('.href-next__newtab-inputs')
      inputType.addEventListener('change', (ev) => {
        switch ((<HTMLInputElement>ev.target).value) {
          case 'url':
            inputsUrl.style.display = ''
            inputsEmail.style.display = 'none'

            inputNewTab.style.display = ''
            break
          case 'email':
            inputsUrl.style.display = 'none'
            inputsEmail.style.display = ''

            inputNewTab.style.display = 'none'
            break
        }
      })
      return el
    },

    onEvent({ elInput, component }) {
      const inputType = elInput.querySelector('.href-next__type')
      let href = ''

      switch (inputType.value) {
        case 'url':
          const valUrl = elInput.querySelector('.href-next__url').value
          href = valUrl

          const valIsNewTab = elInput.querySelector('.href-next__newtab').checked
          if (valIsNewTab) {
            component.addAttributes({ target: '_blank' })
          } else {
            component.removeAttributes('target')
          }
          break
        case 'email':
          const valEmail = elInput.querySelector('.href-next__email').value
          href = `mailto:${valEmail}`
          break
      }

      component.addAttributes({ href })
    },

    onUpdate({ elInput, component }) {
      const href = component.getAttributes().href || ''
      const inputType = elInput.querySelector('.href-next__type')
      let type = 'url'

      const valIsNewTab = elInput.querySelector('.href-next__newtab')
      if (href.indexOf('mailto:') === 0) {
        const inputEmail = elInput.querySelector('.href-next__email')
        const mailTo = href.replace('mailto:', '').split('?')
        const email = mailTo[0]
        type = 'email'

        inputEmail.value = email || ''
      } else {
        elInput.querySelector('.href-next__url').value = href
      }

      valIsNewTab.checked = component.getAttributes().target === '_blank'

      inputType.value = type
      inputType.dispatchEvent(new CustomEvent('change'))
    },
  })

  const onClickButtonClear = (src) => `const run = (e) => {
      if (e.target.getAttribute('data-gjs-type') !== 'button') {
        ${src}
      }
    };
    run(arguments[0])
  `

  trtm.addType('button-next', {
    noLabel: true,

    createInput({ trait }) {
      const el = document.createElement('div')
      el.style.backgroundColor = 'white'

      el.innerHTML = `
        <select class="button-next__type" style="background-color: #f1f1f1; margin-bottom: 10px; ${fixAppearanceStyle}">
          <option value="url">URL</option>
          <option value="email">Email</option>
          <option value="submit">Submit</option>
        </select>
        <div class="button-next__url-inputs" style="background-color: #f1f1f1; margin-bottom: 10px;">
          <input class="button-next__url" placeholder="Insert URL"/>
        </div>
        <div class="button-next__email-inputs" style="background-color: #f1f1f1;">
          <input class="button-next__email" placeholder="Insert email"/>
        </div>
        
        <div class="button-next__newtab-inputs" style="margin-bottom: 10px;">
          <input style="width: auto; ${fixAppearanceStyle}" class="button-next__newtab" type="checkbox">
          <label> Open in "New Tab"</label>
        </div>

        <!--
          <div class="button-next__action-inputs" style="background-color: #f1f1f1; margin-bottom: 10px;">
            <input class="button-next__action" placeholder="Insert action URL"/>
          </div>

          <div class="button-next__async-inputs">
            <input style="width: auto; ${fixAppearanceStyle}" class="button-next__async" type="checkbox">
            <label> Async</label>
          </div>
        -->
      `

      const inputType = <HTMLElement>el.querySelector('.button-next__type')

      const inputsUrl = <HTMLElement>el.querySelector('.button-next__url-inputs')
      inputsUrl.style.display = ''
      const inputsEmail = <HTMLElement>el.querySelector('.button-next__email-inputs')
      inputsEmail.style.display = 'none'
      const inputNewTab = <HTMLElement>el.querySelector('.button-next__newtab-inputs')
      inputNewTab.style.display = ''

      inputType.addEventListener('change', (ev) => {
        const type = (<HTMLInputElement>ev.target).value
        switch (type) {
          case 'url':
            inputsUrl.style.display = ''
            inputsEmail.style.display = 'none'

            inputNewTab.style.display = ''
            break
          case 'email':
            inputsUrl.style.display = 'none'
            inputsEmail.style.display = ''

            inputNewTab.style.display = 'none'
            break
          case 'submit':
            inputsUrl.style.display = 'none'
            inputsEmail.style.display = 'none'

            inputNewTab.style.display = 'none'
            break
        }
      })
      return el
    },

    onEvent({ elInput, component }) {
      const inputType = elInput.querySelector('.button-next__type')
      let onClickSrc = ''

      switch (inputType.value) {
        case 'url':
          const valUrl = elInput.querySelector('.button-next__url').value
          const valIsNewTab = elInput.querySelector('.button-next__newtab').checked

          onClickSrc = valIsNewTab
            ? `window.open('${valUrl}', '_blank')?.focus()`
            : `location.href = "${valUrl}"`

          component.addAttributes({ type: 'button' })

          component.addAttributes({ 'data-gjs-sub-type': 'url' })
          component.addAttributes({ 'data-gjs-url': valUrl })
          component.addAttributes({ 'data-gjs-new-tab': valIsNewTab })

          component.removeAttributes('data-gjs-email')

          component.addAttributes({ onclick: onClickButtonClear(onClickSrc) })
          break
        case 'email':
          const valEmail = elInput.querySelector('.button-next__email').value
          onClickSrc = `location.href = "mailto:${valEmail}"`

          component.addAttributes({ type: 'button' })

          component.addAttributes({ 'data-gjs-sub-type': 'email' })
          component.addAttributes({ 'data-gjs-email': valEmail })

          component.removeAttributes('data-gjs-url')
          component.removeAttributes('data-gjs-new-tab')

          component.addAttributes({ onclick: onClickButtonClear(onClickSrc) })
          break
        case 'submit':
          component.addAttributes({ type: 'submit' })

          component.addAttributes({ 'data-gjs-sub-type': 'submit' })

          component.removeAttributes('data-gjs-email')
          component.removeAttributes('data-gjs-url')
          component.removeAttributes('data-gjs-new-tab')

          component.removeAttributes('onclick')
          break
      }
    },

    onUpdate({ elInput, component }) {
      const attrs = component.getAttributes()
      const type = attrs['data-gjs-sub-type']

      const inputType = elInput.querySelector('.button-next__type')

      if (type === 'url') {
        const inputUrl = elInput.querySelector('.button-next__url')
        const url = attrs['data-gjs-url']
        inputUrl.value = url || ''

        const inputNewTab = elInput.querySelector('.button-next__newtab')
        const newTab = attrs['data-gjs-new-tab']
        inputNewTab.checked = newTab || false
      } else if (type === 'email') {
        const inputEmail = elInput.querySelector('.button-next__email')
        const email = attrs['data-gjs-email']
        inputEmail.value = email || ''
      }

      inputType.value = type || 'url'
      inputType.dispatchEvent(new CustomEvent('change'))
    },
  })

  trtm.addType('svg-next', {
    noLabel: true,

    createInput() {
      const el = document.createElement('div')
      el.style.backgroundColor = 'white'

      el.innerHTML = `
        <div class="svg-next__svg-inputs" style="background-color: #f1f1f1;">
          <input class="svg-next__svg" placeholder="Path"/>
        </div>
      `
      return el
    },

    onEvent({ elInput, component }) {
      const newPath = elInput.querySelector('.svg-next__svg').value
      if (newPath === '' || !isPath(newPath)) return

      const parser = new DOMParser()
      const htmlDoc = parser.parseFromString(component.toHTML(), 'text/html')
      const pathEl = htmlDoc.querySelector('path')
      pathEl?.setAttribute('d', newPath)
      pathEl?.setAttribute('data-gjs-type', 'svg-in')
      pathEl?.setAttribute('draggable', 'true')
      component.replaceWith(htmlDoc.body.innerHTML)
    },

    onUpdate({ elInput, component }) {
      const parser = new DOMParser()
      const htmlDoc = parser.parseFromString(component.toHTML(), 'text/html')
      const path = htmlDoc.querySelector('path')?.getAttribute('d')
      elInput.querySelector('.svg-next__svg').value = path
    },
  })

  trtm.addType('form-next', {
    noLabel: true,

    createInput() {
      const el = document.createElement('div')
      el.style.backgroundColor = 'white'
      el.innerHTML = `
        <div>
          <input style="width: auto; ${fixAppearanceStyle}" class="form-next__async" type="checkbox">
          <label> Async</label>
        </div>
      `
      return el
    },

    onEvent({ elInput, component }) {
      const valIsAsync = elInput.querySelector('.form-next__async').checked

      component.addAttributes({ 'data-gjs-async': valIsAsync })

      // const onClickSrc = `
      //   const run = (e) => {
      //     if (e.target.getAttribute('data-gjs-type') !== 'button') {
      //       e.preventDefault()
      //       this.form.submit()
      //     }
      //   };
      //   run(arguments[0])
      // `
      const content = valIsAsync
        ? `
          e.preventDefault()

          const params = new URLSearchParams()
          const body = new FormData(e.target)
          body.forEach(([f, v]) => params.append(f, v))

          const action = e.target.getAttribute('action')
          const method = e.target.getAttribute('method')

          fetch(action, { method, ...(method.toUpperCase() !== 'GET' ? {body} : {}) })            
            .then((e) =>  e.text().then(d => ({ok: e.ok, text: d})))
            .then(({ok, text}) => {
              let message = ok ? 'All good' : 'Something went wrong'
              let type = ok ? 'info' : 'error'
              try {
                const data = JSON.parse(text)
                if (data.message) message = data.message
              } catch(err) {}
              document.dispatchEvent(new CustomEvent('toast', {detail: {message, type}}))
            })

            for (let el of e.target.elements) el.value = null

        `
        : `
          for (let el of e.target.elements) el.value = null

          e.preventDefault()
          e.target.submit()
        `

      const onClickSrc = `
        const run = (e) => {
          ${content}
        };
        run(arguments[0])
      `
      component.addAttributes({ onsubmit: onClickSrc })
    },

    onUpdate({ elInput, component }) {
      const attrs = component.getAttributes()
      const inputAsync = elInput.querySelector('.form-next__async')
      const isAsync = attrs['data-gjs-async']
      inputAsync.checked = isAsync || ''
    },
  })
}
