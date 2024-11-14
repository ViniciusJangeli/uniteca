import React from "react";
import { Card, CardContent, CardActionArea, Typography,
} from "@mui/material";
import { SvgIconComponent } from "@mui/icons-material";
import Link from "next/link";

interface ActionCardProps {
  icon: SvgIconComponent;
  title: string;
  description: string;
  link: string;
}

const ActionCard: React.FC<ActionCardProps> = ({icon: Icon,title,description,link }) => {
  return (
    <Link href={link}>
      <Card
        sx={{ height: 400, width: 350, borderTop: '4px solid #0089B6', borderBottom: '4px solid #0089B6', display: "flex", flexDirection: "column", transition: "0.3s", boxShadow: 5,
          "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: 3,
          },
        }}
      >
        <CardActionArea
          sx={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", p: 3,
          }}
        >
          <Icon sx={{ fontSize: 62, color: "#0089B6", mb: 2 }} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div" align="center" color="#1D3557"
            >
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center">
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
};

export default ActionCard;
