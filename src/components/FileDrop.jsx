import { useRef, useState } from 'react'

// Drag-and-drop (or click) file picker.
// `multiple` caps at `max` files; single mode replaces the file.
export default function FileDrop({ label, hint, files, onChange, multiple = false, max = 4, accept }) {
  const inputRef = useRef(null)
  const [over, setOver] = useState(false)

  const addFiles = (list) => {
    const incoming = Array.from(list)
    if (multiple) {
      onChange([...files, ...incoming].slice(0, max))
    } else {
      onChange(incoming.slice(0, 1))
    }
  }

  const removeFile = (i) => onChange(files.filter((_, idx) => idx !== i))

  return (
    <div>
      <p className="mb-1.5 text-sm font-medium">{label}</p>
      <div
        onClick={() => inputRef.current.click()}
        onDragOver={(e) => {
          e.preventDefault()
          setOver(true)
        }}
        onDragLeave={() => setOver(false)}
        onDrop={(e) => {
          e.preventDefault()
          setOver(false)
          addFiles(e.dataTransfer.files)
        }}
        className={`cursor-pointer rounded-2xl border border-dashed p-5 text-center transition-colors ${
          over ? 'border-cyan bg-cyan/10' : 'border-white/20 bg-white/[0.03] hover:border-white/35'
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          hidden
          multiple={multiple}
          accept={accept}
          onChange={(e) => {
            addFiles(e.target.files)
            e.target.value = ''
          }}
        />
        <p className="text-sm text-mist">
          {files.length === 0 ? (
            <>Drop {multiple ? 'files' : 'a file'} here or <span className="font-semibold text-cyan">browse</span></>
          ) : multiple && files.length < max ? (
            <>Add more or <span className="font-semibold text-cyan">browse</span></>
          ) : (
            'Looks good ✓'
          )}
        </p>
        {hint && <p className="mt-1 text-xs text-mist/70">{hint}</p>}
      </div>
      {files.length > 0 && (
        <ul className="mt-2 space-y-1.5">
          {files.map((f, i) => (
            <li key={`${f.name}-${i}`} className="flex items-center justify-between rounded-xl bg-white/[0.05] px-3.5 py-2 text-sm">
              <span className="truncate text-mist">
                {f.name} <span className="text-xs text-mist/60">({Math.max(1, Math.round(f.size / 1024))} KB)</span>
              </span>
              <button
                type="button"
                onClick={() => removeFile(i)}
                className="ml-3 shrink-0 text-mist hover:text-frost"
                aria-label={`Remove ${f.name}`}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
