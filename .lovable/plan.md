

## Fix Logo Transparency and Increase Size

### What's Wrong

The logo PNG currently has semi-transparent grayish pixels around the "AL" icon. Even though the file technically has transparency (the checkerboard pattern is visible), these residual pixels appear as a dark/blackish background when displayed on your cream-colored site. The `mix-blend-multiply` CSS class we added helps but doesn't fully solve the problem.

### Solution

I'll regenerate the logo image with a completely clean transparent background, ensuring no gray or dark pixels remain around the icon. I'll also increase the logo size in the navbar to the maximum that fits without crowding the navigation links.

### Changes

**1. Regenerate the logo with true transparency**
- Use image generation to create a clean version of the "AL" circuit board logo
- Ensure the background is 100% transparent with no artifacts
- Keep the warm amber/coral gradient colors that match your design system

**2. Increase logo size in Navbar**
- Change from `h-14` to `h-20` (maximum size that fits the 80px navbar height)
- Remove `mix-blend-multiply` since it won't be needed with true transparency

**3. Increase logo size in Footer**
- Change from `h-16` to `h-20` for consistency
- Remove `mix-blend-multiply`

### Files to Modify

| File | Change |
|------|--------|
| `src/assets/AuctoLabs_Logo.png` | Regenerate with clean transparent background |
| `src/components/layout/Navbar.tsx` | Change `h-14` to `h-20`, remove `mix-blend-multiply` |
| `src/components/layout/Footer.tsx` | Change `h-16` to `h-20`, remove `mix-blend-multiply` |

