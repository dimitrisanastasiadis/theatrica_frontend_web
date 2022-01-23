import NextLink from "next/link"
import { Link } from "@material-ui/core"

export default function Custom404() {
  return (
    <div className="pageWrapper">
      <div className="pageContent">
       <h1>404 - Δεν βρέθηκε η σελίδα!</h1>
        <NextLink href="/" passHref>
          <Link variant="body1" color="secondary">
            Επιστροφή στην Αρχική
          </Link>
        </NextLink>
      </div>
    </div>
  )
}