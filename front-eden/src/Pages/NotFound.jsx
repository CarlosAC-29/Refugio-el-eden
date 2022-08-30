import { Stack, Typography} from "@mui/material"
import { Icon } from "@iconify/react";

export default function NotFound() {
  return (
    <div>
      <Stack spacing={2} alignItems="center">
        <Typography variant='h1'> Page not found</Typography>
        <Icon icon="akar-icons:circle-x" width={70} height={70}/>
      </Stack>
    </div>
  )
}

