<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep a single root auth-state subscriber and use the pathless client-only authenticated layout for private pages, so public recovery remains accessible.
- Profile reads and updates use authenticated server functions with owner-scoped RLS; never accept a caller-supplied owner ID.
- Account access uses email credentials; the profile name is display data, not a login credential.
