-- CreateTable
CREATE TABLE "Report" (
    "reportId" SERIAL NOT NULL,
    "roomId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "department" TEXT NOT NULL,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("reportId")
);
