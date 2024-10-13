import { Light as SyntaxHighlighter } from 'react-syntax-highlighter'
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript'
import { githubGist } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import CopyButton from '../copy-button'

SyntaxHighlighter.registerLanguage('javascript', js)

interface CodeBlockProps {
    code: string
    language?: string
}

export default function CodeBlock({ code, language = 'javascript' }: CodeBlockProps) {
    return (
        <div className="relative rounded-lg overflow-hidden">
            <SyntaxHighlighter
                language={language}
                style={githubGist}
                customStyle={{
                    padding: '1rem',
                    fontSize: '0.875rem',
                    lineHeight: '1.25rem',
                    borderRadius: '0.5rem',
                }}
            >
                {code}
            </SyntaxHighlighter>
            <CopyButton className='absolute top-2 right-2 ' data={code} />
        </div>
    )
}