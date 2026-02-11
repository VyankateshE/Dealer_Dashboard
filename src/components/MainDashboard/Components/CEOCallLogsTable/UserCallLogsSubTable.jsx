import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  forwardRef,
  useImperativeHandle,
} from "react";
import { toPng } from "html-to-image";

// const UserCallLogsSubTable = ({
//   dealer,
//   userCallLogs,
//   onGetSortedCallLogs,
//   dealerSummaryCallsDataType,
// }) => {
const UserCallLogsSubTable = forwardRef(
  (
    {
      dealer,
      userCallLogs,
      onGetSortedCallLogs,
      dealerSummaryCallsDataType,
      dealerSummaryRow,
    },
    ref,
  ) => {
    const [isLoading, setIsLoading] = useState(false);
    const tableRef = useRef(null);
    const exportContainerRef = useRef(null); // UPDATED: Main export container ref that wraps summary + table

    const currentUsers = useMemo(() => {
      if (Array.isArray(userCallLogs)) {
        return userCallLogs;
      }
      if (onGetSortedCallLogs && dealer?.dealerId) {
        return onGetSortedCallLogs(dealer.dealerId, dealerSummaryCallsDataType);
      }
      return [];
    }, [dealer, userCallLogs, onGetSortedCallLogs, dealerSummaryCallsDataType]);

    useEffect(() => {
      // Logs removed for cleaner code
    }, [currentUsers, dealerSummaryCallsDataType]);

    //   const handleExportPNG = async () => {

    //     // if (!tableRef.current) return;
    //       if (!exportContainerRef.current) return;

    //     try {
    //       const button = document.activeElement;
    //       const originalHTML = button?.innerHTML;
    //       if (button) {
    //         button.innerHTML =
    //           '<i class="fas fa-spinner fa-spin mr-1"></i>Exporting...';
    //         button.disabled = true;
    //       }

    //       const exportContainer = document.createElement("div");
    //       exportContainer.style.cssText = `
    //         position: fixed;
    //         left: -9999px;
    //         top: 0;
    //         background: white;
    //         z-index: 99999;
    //         overflow: visible;
    //         opacity: 1;
    //         padding: 20px;
    //       `;

    //       // const clone = tableRef.current.cloneNode(true);
    //         // const clone = exportContainerRef.current.cloneNode(true);
    // // console.log("api funtion calle !!!!!!!!!!!!!!!!!!")
    // //       const scrollableElements = clone.querySelectorAll(
    // //         '[style*="overflow"], .overflow-auto, .overflow-x-auto'
    // //       );
    // //       scrollableElements.forEach((el) => {
    // //         el.style.overflow = "visible";
    // //         el.style.maxHeight = "none";
    // //         el.style.height = "auto";
    // //       });
    //         const clone = exportContainerRef.current.cloneNode(true);

    //     const allOverflowContainers = clone.querySelectorAll(
    //           ".overflow-auto, .overflow-x-auto",
    //         );
    //         const tables = clone.querySelectorAll("table");

    //         if (tables.length === 0) {
    //           throw new Error("No tables found in clone");
    //         }

    //         // ✅ ADD: Make dealer summary table fit-content during export
    //         const dealerSummaryWrapper = clone.querySelector(".mb-4.flex-shrink-0");
    //         if (dealerSummaryWrapper) {
    //           dealerSummaryWrapper.style.width = "fit-content";
    //           dealerSummaryWrapper.style.maxWidth = "fit-content";
    //         }

    //         // ✅ ADD: Make dealer summary overflow container fit-content
    //         const dealerSummaryOverflow =
    //           dealerSummaryWrapper?.querySelector(".overflow-x-auto");
    //         if (dealerSummaryOverflow) {
    //           dealerSummaryOverflow.style.width = "fit-content";
    //           dealerSummaryOverflow.style.maxWidth = "fit-content";
    //         }

    //         // ✅ ADD: Make dealer summary table fit-content AND remove border
    //         const dealerSummaryTable = dealerSummaryWrapper?.querySelector("table");
    //         if (dealerSummaryTable) {
    //           dealerSummaryTable.style.width = "auto";
    //           dealerSummaryTable.style.minWidth = "auto";

    //           // ✅ NEW: Remove border from last column header in dealer summary table
    //           const dealerHeaderCells =
    //             dealerSummaryTable.querySelectorAll("thead th");
    //           if (dealerHeaderCells.length > 0) {
    //             const lastHeaderCell =
    //               dealerHeaderCells[dealerHeaderCells.length - 1];
    //             lastHeaderCell.style.borderRight = "none";
    //           }

    //           // ✅ NEW: Remove border from last column data cell in dealer summary table
    //           const dealerDataCells =
    //             dealerSummaryTable.querySelectorAll("tbody td");
    //           if (dealerDataCells.length > 0) {
    //             const lastDataCell = dealerDataCells[dealerDataCells.length - 1];
    //             lastDataCell.style.borderRight = "none";
    //           }
    //         }

    //         // Remove constraints and set to auto width
    //         exportContainer.style.width = "auto";
    //         exportContainer.style.height = "auto";
    //         exportContainer.style.maxWidth = "none";

    //         // Make ALL overflow containers visible
    //         allOverflowContainers.forEach((container) => {
    //           container.style.overflow = "visible";
    //           container.style.overflowX = "visible";
    //           container.style.overflowY = "visible";
    //           container.style.height = "auto";
    //           container.style.maxHeight = "none";
    //           container.style.position = "static";
    //           container.style.width = "auto";
    //           container.style.maxWidth = "none";
    //         });

    //         // Make clone container fit content
    //         clone.style.width = "auto";
    //         clone.style.maxWidth = "none";
    //         clone.style.overflow = "visible";
    //         clone.style.display = "block";

    //       const stickyElements = clone.querySelectorAll(
    //         '.sticky, [style*="position: sticky"]'
    //       );
    //       stickyElements.forEach((el) => {
    //         el.style.position = "static";
    //         el.style.left = "auto";
    //         el.style.top = "auto";
    //         el.style.zIndex = "auto";

    //       });

    //        tables.forEach((table) => {
    //           table.style.width = "auto";
    //           table.style.minWidth = "auto";
    //           table.style.maxWidth = "none";
    //           table.style.position = "static";
    //           table.style.tableLayout = "auto";
    //           table.style.display = "table";
    //         });

    //       const buttons = clone.querySelectorAll(
    //         "button, .export-button, .btn-export"
    //       );
    //       const inputs = clone.querySelectorAll("input, select, textarea");
    //       [...buttons, ...inputs].forEach((el) => el.remove());

    //       const spinners = clone.querySelectorAll(".fa-spinner");
    //       spinners.forEach((spinner) => spinner.remove());

    //       exportContainer.appendChild(clone);
    //       document.body.appendChild(exportContainer);

    //       await new Promise((resolve) => setTimeout(resolve, 300));

    //       const dataUrl = await toPng(clone, {
    //         quality: 1,
    //         pixelRatio: 2,
    //         backgroundColor: "#ffffff",
    //         style: {
    //           margin: "0",
    //           padding: "0",
    //         },
    //       });

    //       document.body.removeChild(exportContainer);

    //       const link = document.createElement("a");
    //       const dealerName = dealer?.dealerName?.replace(/\s+/g, "-") || "dealer";
    //       link.download = `user-calls-${dealerName}-${
    //         new Date().toISOString().split("T")[0]
    //       }.png`;
    //       link.href = dataUrl;
    //       document.body.appendChild(link);
    //       link.click();
    //       document.body.removeChild(link);

    //       if (button && originalHTML) {
    //         button.innerHTML = originalHTML;
    //         button.disabled = false;
    //       }
    //     } catch (error) {
    //       console.error("Error exporting PNG:", error);
    //       alert("Failed to export PNG. Please try again.");

    //       const button = document.activeElement;
    //       if (button) {
    //         button.innerHTML = '<i class="fas fa-image mr-1"></i>Export PNG';
    //         button.disabled = false;
    //       }
    //     }
    //   };
    const handleExportPNG = async () => {
      if (!exportContainerRef.current) return;

      try {
        const button = document.activeElement;
        const originalHTML = button?.innerHTML;

        if (button) {
          button.innerHTML =
            '<i class="fas fa-spinner fa-spin mr-1"></i>Exporting...';
          button.disabled = true;
        }

        // Offscreen container
        const exportContainer = document.createElement("div");
        exportContainer.style.cssText = `
      position: fixed;
      left: -9999px;
      top: 0;
      background: white;
      z-index: 99999;
      overflow: visible;
      padding: 20px;
    `;

        // Clone FULL container (summary + table)
        const clone = exportContainerRef.current.cloneNode(true);

        // 1. Remove all scroll limits
        const scrollContainers = clone.querySelectorAll(
          ".overflow-auto, .overflow-x-auto, [class*='max-h']",
        );

        scrollContainers.forEach((el) => {
          el.style.overflow = "visible";
          el.style.overflowX = "visible";
          el.style.overflowY = "visible";
          el.style.maxHeight = "none";
          el.style.height = "auto";
        });

        // 2. Remove sticky positioning
        const stickyElements = clone.querySelectorAll(
          '.sticky, [style*="position: sticky"]',
        );

        stickyElements.forEach((el) => {
          el.style.position = "static";
          el.style.left = "auto";
          el.style.top = "auto";
          el.style.zIndex = "auto";
        });

        // 3. Remove flex shrink restrictions
        const flexParents = clone.querySelectorAll('[class*="flex"]');
        flexParents.forEach((el) => {
          el.style.height = "auto";
          el.style.maxHeight = "none";
          el.style.minHeight = "auto";
        });

        // 4. Expand tables fully
        const tables = clone.querySelectorAll("table");
        tables.forEach((table) => {
          table.style.width = "auto";
          table.style.minWidth = "auto";
          table.style.maxWidth = "none";
          table.style.tableLayout = "auto";
          table.style.display = "table";
        });

        // 5. Remove buttons & inputs
        const buttons = clone.querySelectorAll(
          "button, .export-button, .btn-export",
        );
        const inputs = clone.querySelectorAll("input, select, textarea");

        [...buttons, ...inputs].forEach((el) => el.remove());

        // 6. Remove spinners
        const spinners = clone.querySelectorAll(".fa-spinner");
        spinners.forEach((spinner) => spinner.remove());

        exportContainer.appendChild(clone);
        document.body.appendChild(exportContainer);

        // Wait for render
        await new Promise((resolve) => {
          requestAnimationFrame(() => {
            clone.offsetHeight;
            resolve();
          });
        });

        await new Promise((resolve) => setTimeout(resolve, 300));

        // Calculate full size
        const rect = clone.getBoundingClientRect();

        const dataUrl = await toPng(clone, {
          quality: 1,
          pixelRatio: 2,
          backgroundColor: "#ffffff",
          width: Math.ceil(rect.width + 40),
          height: Math.ceil(rect.height + 40),
          style: {
            padding: "20px",
          },
        });

        document.body.removeChild(exportContainer);

        // Download
        const link = document.createElement("a");
        const dealerName = dealer?.dealerName?.replace(/\s+/g, "-") || "dealer";

        link.download = `user-calls-${dealerName}-${
          new Date().toISOString().split("T")[0]
        }.png`;

        link.href = dataUrl;
        link.click();

        if (button && originalHTML) {
          button.innerHTML = originalHTML;
          button.disabled = false;
        }
      } catch (error) {
        console.error("PNG export failed:", error);
      }
    };

    const getUserName = (user) => {
      return user?.name || user?.user || "Unknown User";
    };

    const getCallValue = (user, path, defaultValue = 0) => {
      try {
        const value = path.split(".").reduce((obj, key) => obj?.[key], user);
        return value !== undefined && value !== null ? value : defaultValue;
      } catch (error) {
        return defaultValue;
      }
    };

    const exportUserLogsToCSV = () => {
      if (!currentUsers || currentUsers.length === 0) {
        alert("No data to export");
        return;
      }

      const headers = [
        "User Name",
        "Total Calls",
        "Outgoing Calls",
        "Incoming Calls",
        "Connected Calls",
        "Declined Calls",
        "Total Duration",
        "Avg Duration",
        "Calls > 1m",
      ];

      const csvRows = currentUsers.map((user) => {
        return [
          `"${getUserName(user).replace(/"/g, '""')}"`,
          getCallValue(user, "calls.total", 0),
          getCallValue(user, "calls.outgoing", 0),
          getCallValue(user, "calls.incoming", 0),
          getCallValue(user, "calls.connected", 0),
          getCallValue(user, "calls.declined", 0),
          getCallValue(user, "calls.duration", 0),
          getCallValue(user, "calls.avgConnected", 0),
          getCallValue(user, "calls.callsAbove1Min", 0),
        ];
      });

      const csvContent = [
        headers.join(","),
        ...csvRows.map((row) => row.join(",")),
      ].join("\n");

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);

      link.setAttribute("href", url);
      link.setAttribute(
        "download",
        `user-calls-${dealer?.dealerName?.replace(/\s+/g, "-") || "unknown"}-${
          new Date().toISOString().split("T")[0]
        }.csv`,
      );
      link.style.visibility = "hidden";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    };

    useImperativeHandle(ref, () => ({
      exportPNG: handleExportPNG,
      exportCSV: exportUserLogsToCSV,
    }));

    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#222fb9] mb-4"></div>
          <div className="text-gray-500 text-sm">Loading user call data...</div>
        </div>
      );
    }

    if (!currentUsers || currentUsers.length === 0) {
      return (
        <div className="text-center p-8">
          <div className="text-gray-500 text-sm">
            <i className="fas fa-users text-gray-400 mr-2"></i>
            No user call data available for{" "}
            {dealer?.dealerName || "this dealer"}
            <div className="text-xs text-gray-400 mt-1">
              Filter: {dealerSummaryCallsDataType}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div ref={exportContainerRef} className="w-full">
        {dealerSummaryRow && <div className="mb-2">{dealerSummaryRow}</div>}
        {/* ✅ FIXED: Added proper overflow structure matching GM code */}
        <div
          ref={tableRef}
          className="border border-gray-300 rounded-lg bg-white overflow-hidden"
        >
          <div className="overflow-x-auto">
            <div className="relative overflow-auto max-h-[400px]">
              <table className="w-full min-w-full">
                <thead className="bg-gray-100 sticky top-0 z-[60]">
                  <tr>
                    {/* ✅ FIXED: Proper sticky positioning matching GM exactly */}
                    <th className="sticky left-0 top-0 z-[65] bg-gray-100 px-2 sm:px-3 py-2 text-left text-xs font-semibold text-gray-700 border-b border-r border-gray-300 whitespace-nowrap w-[60px] sm:w-[80px]">
                      User
                    </th>
                    <th className="px-2 sm:px-3 py-2 text-center text-xs font-semibold text-gray-700 border-b border-r border-gray-300 whitespace-nowrap bg-gray-100 min-w-[50px] sm:min-w-[70px]">
                      Total
                    </th>
                    <th className="px-2 sm:px-3 py-2 text-center text-xs font-semibold text-gray-700 border-b border-r border-gray-300 whitespace-nowrap bg-gray-100 min-w-[50px] sm:min-w-[70px]">
                      Outgoing
                    </th>
                    <th className="px-2 sm:px-3 py-2 text-center text-xs font-semibold text-gray-700 border-b border-r border-gray-300 whitespace-nowrap bg-gray-100 min-w-[50px] sm:min-w-[70px]">
                      Incoming
                    </th>
                    <th className="px-2 sm:px-3 py-2 text-center text-xs font-semibold text-gray-700 border-b border-r border-gray-300 whitespace-nowrap bg-gray-100 min-w-[50px] sm:min-w-[70px]">
                      Connected
                    </th>
                    <th className="px-2 sm:px-3 py-2 text-center text-xs font-semibold text-gray-700 border-b border-r border-gray-300 whitespace-nowrap bg-gray-100 min-w-[50px] sm:min-w-[70px]">
                      Declined
                    </th>
                    <th className="px-2 sm:px-3 py-2 text-center text-xs font-semibold text-gray-700 border-b border-r border-gray-300 whitespace-nowrap bg-gray-100 min-w-[70px] sm:min-w-[90px]">
                      Duration
                    </th>
                    <th className="px-2 sm:px-3 py-2 text-center text-xs font-semibold text-gray-700 border-b border-r border-gray-300 whitespace-nowrap bg-gray-100 min-w-[70px] sm:min-w-[90px]">
                      Avg Duration (in mins)
                    </th>
                    {/* Calls > 1m Column with sorting - COMPACT STYLING */}
                      <th className="px-1 py-1.5 text-center font-semibold text-gray-700 border-b border-r border-gray-300 whitespace-nowrap bg-gray-100 min-w-[50px]">
                        <div
                          className="flex items-center justify-center cursor-pointer hover:text-[#222fb9] transition-colors"
                          // onClick={() => handleCallLogSort("calls_above_1min")}
                        >
                          Calls &gt; 1m
                          {/* <CallLogSortIcon column="calls_above_1min" /> */}
                        </div>
                      </th>

                      {/* ✅ ADDED: Calls > 4m Column with sorting - COMPACT STYLING */}
                      <th className="px-1 py-1.5 text-center font-semibold text-gray-700 border-b border-r border-gray-300 whitespace-nowrap bg-gray-100 min-w-[50px]">
                        <div
                          className="flex items-center justify-center cursor-pointer hover:text-[#222fb9] transition-colors"
                          // onClick={() => handleCallLogSort("calls_above_4min")}
                        >
                          Calls &gt; 4m
                          {/* <CallLogSortIcon column="calls_above_4min" /> */}
                        </div>
                      </th>

                      {/* ✅ ADD: Action Column Header - COMPACT STYLING */}
                      <th className="sticky right-0 top-0 z-[65] px-1 py-1.5 text-center font-semibold text-gray-700 border-b border-gray-300 whitespace-nowrap bg-gray-100 min-w-[30px]">
                        Actions
                      </th>
                  </tr>
                </thead>
                <tbody>
                  {currentUsers.map((user, userIndex) => {
                    return (
                      <tr
                        key={user.userId || userIndex}
                        className={`${
                          userIndex % 2 === 0 ? "bg-white" : "bg-gray-50"
                        } hover:bg-blue-50 transition-colors`}
                      >
                        {/* ✅ FIXED: Sticky first column matching GM structure */}
                        <td
                          className={`sticky left-0 z-[55] px-1 sm:px-2 py-1 text-left font-medium text-gray-900 border-r border-gray-200 w-[60px] sm:w-[80px] ${
                            userIndex % 2 === 0 ? "bg-white" : "bg-gray-50"
                          }`}
                        >
                          <div className="md:hidden">
                            <p className="font-semibold text-[10px] text-gray-800 leading-tight break-words">
                              {getUserName(user)}
                            </p>
                          </div>
                          <div className="hidden md:block">
                            <p className="font-semibold text-xs text-gray-800 truncate">
                              {getUserName(user)}
                            </p>
                          </div>
                        </td>

                        <td className="px-2 sm:px-3 py-2 text-center border-b border-r border-gray-300 whitespace-nowrap">
                          <div
                            className={`flex items-center justify-center gap-1 ${
                              getCallValue(user, "calls.total", 0) < 60
                                ? "text-red-600 font-bold"
                                : "text-gray-900 font-semibold"
                            }`}
                          >
                            <svg
                              className="w-2 h-2 sm:w-3 sm:h-3"
                              fill="currentColor"
                              viewBox="0 0 16 16"
                            >
                              <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                            </svg>
                            <span className="text-[10px] sm:text-xs">
                              {getCallValue(user, "calls.total", 0)}
                            </span>
                          </div>
                        </td>

                        <td className="px-2 sm:px-3 py-2 text-center border-b border-r border-gray-300 whitespace-nowrap">
                          <div className="flex items-center justify-center text-green-600 text-[10px] sm:text-xs font-semibold">
                            <span className="text-[10px] sm:text-xs mr-1">
                              ↑
                            </span>
                            {getCallValue(user, "calls.outgoing", 0)}
                          </div>
                        </td>

                        <td className="px-2 sm:px-3 py-2 text-center border-b border-r border-gray-300 whitespace-nowrap">
                          <div className="flex items-center justify-center text-green-600 text-[10px] sm:text-xs font-semibold">
                            <span className="text-[10px] sm:text-xs mr-1">
                              ↓
                            </span>
                            {getCallValue(user, "calls.incoming", 0)}
                          </div>
                        </td>

                        <td className="px-2 sm:px-3 py-2 text-center border-b border-r border-gray-300 whitespace-nowrap">
                          <div className="flex items-center justify-center">
                            <span
                              className={`flex items-center justify-center w-2 h-2 sm:w-3 sm:h-3 rounded-full text-white text-[8px] sm:text-[10px] font-bold mr-1 ${
                                getCallValue(user, "calls.connected", 0) < 30
                                  ? "bg-red-500"
                                  : "bg-blue-600"
                              }`}
                            >
                              ✓
                            </span>
                            <span
                              className={`text-[10px] sm:text-xs font-semibold ${
                                getCallValue(user, "calls.connected", 0) < 30
                                  ? "text-red-500"
                                  : "text-blue-600"
                              }`}
                            >
                              {getCallValue(user, "calls.connected", 0)}
                            </span>
                          </div>
                        </td>

                        <td className="px-2 sm:px-3 py-2 text-center border-b border-r border-gray-300 whitespace-nowrap">
                          <div className="flex items-center justify-center text-red-600 text-[10px] sm:text-xs font-semibold">
                            <span className="flex items-center justify-center w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500 text-white text-[8px] sm:text-[10px] font-bold mr-1">
                              ✗
                            </span>
                            {getCallValue(user, "calls.declined", 0)}
                          </div>
                        </td>

                        <td className="px-2 sm:px-3 py-2 text-center border-b border-r border-gray-300 whitespace-nowrap">
                          <div className="flex items-center justify-center text-gray-700 text-[10px] sm:text-xs font-semibold">
                            {getCallValue(user, "calls.duration", 0)}
                          </div>
                        </td>

                        <td className="px-2 sm:px-3 py-2 text-center border-b border-r border-gray-300 whitespace-nowrap">
                          <div className="flex items-center justify-center text-gray-700 text-[10px] sm:text-xs font-semibold">
                            {getCallValue(user, "calls.avgConnected", 0)}
                          </div>
                        </td>

                        <td className="px-2 sm:px-3 py-2 text-center border-b border-r border-gray-300 whitespace-nowrap">
                          <div className="flex items-center justify-center text-gray-700 text-[10px] sm:text-xs font-semibold">
                            {getCallValue(user, "calls.callsAbove1Min", 0)}
                          </div>
                        </td>
                        <td className="px-1 py-1 text-center border-b border-r border-gray-300 whitespace-nowrap">
                            <div className="flex items-center justify-center text-gray-700 text-[11px] font-semibold">
                              callsAbove4Min
                            </div>
                          </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  },
);

export default UserCallLogsSubTable;
