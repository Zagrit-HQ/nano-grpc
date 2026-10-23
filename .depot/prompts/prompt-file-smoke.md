This is a smoke test for loading a CI agent prompt from a committed file.

Return these exact structured outputs:
- ok: true
- marker: nano-prompt-file-20261023-8f31c6
- repository: ${{ github.repository }}
- context: ${{ env.PROMPT_FILE_CONTEXT }}

Do not run tools, access the network, modify files, or perform any other work.
