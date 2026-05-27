import register from 'preact-custom-element';
import { render, h } from 'preact';
import Alert from './Alert';
import Accordion from './Accordion';
import CodeBlock from './CodeBlock';

// Register custom elements without Shadow DOM so they inherit Tailwind CSS from the host page
register(Alert, 'docs-alert', ['type', 'title', 'dismissible', 'className', 'icon'], { shadow: false });
register(Accordion, 'docs-accordion', ['title', 'open'], { shadow: false });
register(CodeBlock, 'docs-code-block', ['language', 'code'], { shadow: false });

// Expose DevDocs helper methods to window for JS Functional rendering
const DevDocs = {
  Alert: (props) => {
    const container = document.createElement('div');
    // Support children as HTML string or element
    const componentProps = { ...props };
    render(h(Alert, componentProps), container);
    return container.firstElementChild || container;
  },
  Accordion: (props) => {
    const container = document.createElement('div');
    render(h(Accordion, props), container);
    return container.firstElementChild || container;
  },
  CodeBlock: (props) => {
    const container = document.createElement('div');
    render(h(CodeBlock, props), container);
    return container.firstElementChild || container;
  }
};

window.DevDocs = DevDocs;
export { Alert, Accordion, CodeBlock };
