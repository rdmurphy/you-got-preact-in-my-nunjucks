import { Component, html } from 'htm/preact';

class Demo extends Component {
  render({ foo }) {
    return html`
      <p>Hello from the Preact component! Also foo: ${foo}</p>
    `;
  }
}

export default Demo;
