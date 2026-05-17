import { FaDog } from "react-icons/fa";
import Button from "../../../atoms/button/button";
import { motion, Variants } from "motion/react";
import { ProfileCard } from "../../../molecules/auth/profile-card";
import { useProfile } from "@/core/application/features/system/auth/hooks/useProfile";
import { Skeleton } from "@/components/atoms/skeleton";

const ctaVariants: Variants = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, delay: 0.5, ease: "easeOut" },
  },
};

export default function AuthCard() {
  const { data, isLoading, isFetching, isRefetching } = useProfile();

  return (
    <>
      {isLoading || isFetching || isRefetching ? (
        <>
          <Skeleton width="w-[200px]" height="h-[50px]" />
        </>
      ) : (
        <>
          {data ? (
            <ProfileCard />
          ) : (
            <motion.div
              variants={ctaVariants}
              initial="hidden"
              animate="visible"
              className="hidden md:block"
            >
              <Button
                href="/login"
                icon={<FaDog size={16} className="relative z-10" />}
                spaceClassName="bg-white"
                className="text-sm font-semibold hover:text-white"
              >
                <span className="relative z-10 font-medium">
                  Iniciar Sesión
                </span>
              </Button>
            </motion.div>
          )}
        </>
      )}
    </>
  );
}